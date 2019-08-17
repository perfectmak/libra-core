import axios from 'axios';
import BigNumber from 'bignumber.js';
import { credentials, ServiceError } from 'grpc';

import SHA3 from 'sha3';
import { AccountStateBlob, AccountStateWithProof } from '../__generated__/account_state_blob_pb';
import { AdmissionControlClient } from '../__generated__/admission_control_grpc_pb';
import {
  AdmissionControlStatus,
  SubmitTransactionRequest,
  SubmitTransactionResponse,
} from '../__generated__/admission_control_pb';
import {
  GetAccountStateRequest,
  GetAccountStateResponse,
  GetAccountTransactionBySequenceNumberRequest,
  GetAccountTransactionBySequenceNumberResponse,
  RequestItem,
  ResponseItem,
  UpdateToLatestLedgerRequest,
} from '../__generated__/get_with_proof_pb';
import * as mempool_status_pb from '../__generated__/mempool_status_pb';
import { RawTransaction, SignedTransaction, SignedTransactionWithProof } from '../__generated__/transaction_pb';
import HashSaltValues from '../constants/HashSaltValues';
import ServerHosts from '../constants/ServerHosts';
import { KeyPair, Signature } from '../crypto/Eddsa';
import {
  LibraAdmissionControlStatus, LibraMempoolTransactionStatus,
  LibraSignedTransaction,
  LibraSignedTransactionWithProof,
  LibraTransaction,
  LibraTransactionResponse,
} from '../transaction';
import { Account, AccountAddress, AccountAddressLike, AccountState, AccountStates } from '../wallet/Accounts';
import { ClientDecoder } from './Decoder';
import { ClientEncoder } from './Encoder';

interface LibraLibConfig {
  port?: string;
  host?: string;
  network?: LibraNetwork;
  faucetServerHost?: string;
  validatorSetFile?: string;
}

export enum LibraNetwork {
  Testnet = 'testnet',
  // Mainnet = 'mainnet'
}

export class LibraClient {
  private readonly config: LibraLibConfig;
  private readonly client: AdmissionControlClient;
  private readonly decoder: ClientDecoder;
  private readonly encoder: ClientEncoder;

  constructor(config: LibraLibConfig) {
    this.config = config;

    if (config.host === undefined) {
      // since only testnet for now
      this.config.host = ServerHosts.DefaultTestnet;
    }

    if (config.port === undefined) {
      this.config.port = '80';
    }

    const connectionAddress = `${this.config.host}:${this.config.port}`;
    this.client = new AdmissionControlClient(connectionAddress, credentials.createInsecure());

    this.decoder = new ClientDecoder();
    this.encoder = new ClientEncoder(this);
  }

  /**
   * Fetch the current state of an account.
   *
   *
   * @param {string} address Accounts address
   */
  public async getAccountState(address: AccountAddressLike): Promise<AccountState> {
    const result = await this.getAccountStates([address]);
    return result[0];
  }

  /**
   * Fetches the current state of multiple accounts.
   *
   * @param {AccountAddressLike[]} addresses Array of users addresses
   */
  public async getAccountStates(addresses: AccountAddressLike[]): Promise<AccountStates> {
    const accountAddresses = addresses.map(address => new AccountAddress(address));

    const request = new UpdateToLatestLedgerRequest();

    accountAddresses.forEach(address => {
      const requestItem = new RequestItem();
      const getAccountStateRequest = new GetAccountStateRequest();
      getAccountStateRequest.setAddress(address.toBytes());
      requestItem.setGetAccountStateRequest(getAccountStateRequest);
      request.addRequestedItems(requestItem);
    });

    return new Promise<AccountStates>((resolve, reject) => {
      this.client.updateToLatestLedger(request, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(
          response.getResponseItemsList().map((item: ResponseItem, index: number) => {
            const stateResponse = item.getGetAccountStateResponse() as GetAccountStateResponse;
            const stateWithProof = stateResponse.getAccountStateWithProof() as AccountStateWithProof;
            if (stateWithProof.hasBlob()) {
              const stateBlob = stateWithProof.getBlob() as AccountStateBlob;
              const blob = stateBlob.getBlob_asU8();
              return this.decoder.decodeAccountStateBlob(blob);
            }

            return AccountState.default(accountAddresses[index].toHex());
          }),
        );
      });
    });
  }

  /**
   * Returns the Accounts transaction done with sequenceNumber.
   *
   */
  public async getAccountTransaction(
    address: AccountAddressLike,
    sequenceNumber: BigNumber | string | number,
    fetchEvents: boolean = true,
  ): Promise<LibraSignedTransactionWithProof | null> {
    const accountAddress = new AccountAddress(address);
    const parsedSequenceNumber = new BigNumber(sequenceNumber);
    const request = new UpdateToLatestLedgerRequest();

    const requestItem = new RequestItem();
    const getTransactionRequest = new GetAccountTransactionBySequenceNumberRequest();
    getTransactionRequest.setAccount(accountAddress.toBytes());
    getTransactionRequest.setSequenceNumber(parsedSequenceNumber.toString(10));
    getTransactionRequest.setFetchEvents(fetchEvents);
    requestItem.setGetAccountTransactionBySequenceNumberRequest(getTransactionRequest);

    request.addRequestedItems(requestItem);

    return new Promise<LibraSignedTransactionWithProof | null>((resolve, reject) => {
      this.client.updateToLatestLedger(request, (error, response) => {
        if (error) {
          return reject(error);
        }

        const responseItems = response.getResponseItemsList();

        if (responseItems.length === 0) {
          return resolve(null);
        }

        const r = responseItems[0].getGetAccountTransactionBySequenceNumberResponse() as GetAccountTransactionBySequenceNumberResponse;
        const signedTransactionWP = r.getSignedTransactionWithProof() as SignedTransactionWithProof;
        resolve(this.decoder.decodeSignedTransactionWithProof(signedTransactionWP));
      });
    });
  }

  /**
   * Uses the faucetService on testnet to mint coins to be sent
   * to receiver.
   *
   * Returns the sequence number for the transaction used to mint
   *
   * Note: `numCoins` should be in base unit i.e microlibra (10^6 I believe).
   */
  public async mintWithFaucetService(
    receiver: AccountAddress | string,
    numCoins: BigNumber | string | number,
    waitForConfirmation: boolean = true,
  ): Promise<string> {
    const serverHost = this.config.faucetServerHost || ServerHosts.DefaultFaucet;
    const coins = new BigNumber(numCoins).toString(10);
    const address = receiver.toString();
    const response = await axios.post(`http://${serverHost}?amount=${coins}&address=${address}`);

    if (response.status !== 200) {
      throw new Error(`Failed to query faucet service. Code: ${response.status}, Err: ${response.data.toString()}`);
    }
    const sequenceNumber = response.data as string;

    if (waitForConfirmation) {
      await this.waitForConfirmation(AccountAddress.default(), sequenceNumber);
    }

    return sequenceNumber;
  }

  /**
   * Keeps polling the account state of address till sequenceNumber is computed.
   *
   */
  public async waitForConfirmation(
    accountAddress: AccountAddress | string,
    transactionSequenceNumber: number | string | BigNumber,
  ): Promise<void> {
    const sequenceNumber = new BigNumber(transactionSequenceNumber);
    const address = accountAddress.toString();
    let maxIterations = 50;

    const poll = (resolve: (value?: void | PromiseLike<void>) => void, reject: (reason?: Error) => void) => {
      setTimeout(() => {
        maxIterations--;
        this.getAccountState(address)
          .then(accountState => {
            if (accountState.sequenceNumber.gte(sequenceNumber)) {
              return resolve();
            }

            if (maxIterations === -1) {
              reject(new Error(`Confirmation timeout for [${address}]:[${sequenceNumber.toString(10)}]`));
            } else {
              poll(resolve, reject);
            }
          })
          .catch(reject);
      }, 1000);
    };

    return new Promise((resolve, reject) => {
      poll(resolve, reject);
    });
  }

  /**
   * Sign the transaction with keyPair and returns a promise that resolves to a LibraSignedTransaction
   *
   *
   */
  public async signTransaction(transaction: LibraTransaction, keyPair: KeyPair): Promise<LibraSignedTransaction> {
    const rawTxn = await this.encoder.encodeLibraTransaction(transaction, transaction.sendersAddress);
    const signature = this.signRawTransaction(rawTxn, keyPair);

    return new LibraSignedTransaction(transaction, keyPair.getPublicKey(), signature);
  }

  /**
   * Transfer coins from sender to receipient.
   * numCoins should be in libraCoins based unit.
   *
   */
  public async transferCoins(
    sender: Account,
    recipientAddress: string,
    numCoins: number | string | BigNumber,
  ): Promise<LibraTransactionResponse> {
    return this.execute(LibraTransaction.createTransfer(recipientAddress, new BigNumber(numCoins)), sender);
  }

  /**
   * Execute a transaction by sender.
   *
   */
  public async execute(transaction: LibraTransaction, sender: Account): Promise<LibraTransactionResponse> {
    const rawTransaction = await this.encoder.encodeLibraTransaction(transaction, sender.getAddress());
    const signedTransaction = new SignedTransaction();

    const request = new SubmitTransactionRequest();

    const senderSignature = this.signRawTransaction(rawTransaction, sender.keyPair);
    signedTransaction.setRawTxnBytes(rawTransaction.serializeBinary());
    signedTransaction.setSenderPublicKey(sender.keyPair.getPublicKey());
    signedTransaction.setSenderSignature(senderSignature);

    request.setSignedTxn(signedTransaction);
    return new Promise((resolve, reject) => {
      this.client.submitTransaction(request, (error: ServiceError | null, response: SubmitTransactionResponse) => {
        if (error) {
          // TBD: should this fail with only service error
          // or should it fail if transaction is not acknowledged
          return reject(error);
        }

        const vmStatus = this.decoder.decodeVMStatus(response.getVmStatus());
        resolve(
          new LibraTransactionResponse(
            new LibraSignedTransaction(transaction, sender.keyPair.getPublicKey(), senderSignature),
            response.getValidatorId_asU8(),
            response.hasAcStatus()
              ? (response.getAcStatus() as AdmissionControlStatus).getCode() : LibraAdmissionControlStatus.UNKNOWN,
            response.hasMempoolStatus()
              ? (response.getMempoolStatus() as mempool_status_pb.MempoolAddTransactionStatus).getCode() : LibraMempoolTransactionStatus.UNKNOWN,
            vmStatus,
          ),
        );
      });
    });
  }

  private signRawTransaction(rawTransaction: RawTransaction, keyPair: KeyPair): Signature {
    const rawTxnBytes = rawTransaction.serializeBinary();
    const hash = new SHA3(256)
      .update(Buffer.from(HashSaltValues.rawTransactionHashSalt, 'hex'))
      .update(Buffer.from(rawTxnBytes.buffer))
      .digest();

    return keyPair.sign(hash);
  }
}

export default LibraClient;
