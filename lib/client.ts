import axios from 'axios';
import BigNumber from 'bignumber.js';
import {credentials, ServiceError} from 'grpc';

import SHA3 from "sha3";
import {AccountStateBlob, AccountStateWithProof} from './__generated__/account_state_blob_pb';
import {AdmissionControlClient} from './__generated__/admission_control_grpc_pb';
import {SubmitTransactionRequest, SubmitTransactionResponse} from './__generated__/admission_control_pb';
import {
  GetAccountStateRequest,
  GetAccountStateResponse,
  RequestItem,
  ResponseItem,
  UpdateToLatestLedgerRequest,
} from './__generated__/get_with_proof_pb';
import {Program, RawTransaction, SignedTransaction, TransactionArgument} from './__generated__/transaction_pb';
import {CursorBuffer} from './common/CursorBuffer';
import HashSaltValues from './constants/HashSaltValues';
import PathValues from './constants/PathValues';
import {LibraTransaction} from './Transactions';
import {Account, AccountAddress, AccountState, AccountStates} from './wallet/Accounts';

const DefaultFaucetServerHost = 'faucet.testnet.libra.org';
const DefaultTestnetServerHost = 'ac.testnet.libra.org';

interface LibralLibConfig {
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
  private readonly config: LibralLibConfig;
  private readonly client: AdmissionControlClient;

  constructor(config: LibralLibConfig) {
    this.config = config;

    if (config.host === undefined) {
      // since only testnet for now
      this.config.host = DefaultTestnetServerHost;
    }

    if (config.port === undefined) {
      this.config.port = '80';
    }

    const connectionAddress = `${this.config.host}:${this.config.port}`;
    this.client = new AdmissionControlClient(connectionAddress, credentials.createInsecure());
  }

  /**
   * Fetch the current state of an account.
   *
   *
   * @param {string} address Accounts address
   */
  public async getAccountState(address: string): Promise<AccountState> {
    const result = await this.getAccountStates([address]);
    return result[0];
  }

  /**
   * Fetches the current state of multiple accounts.
   *
   * @param {string[]} addresses Array of users addresses
   */
  public async getAccountStates(addresses: string[]): Promise<AccountStates> {
    for (const address of addresses) {
      if (!AccountAddress.isValidString(address)) {
        throw new Error(`[${address}] is not a valid address`);
      }
    }

    const request = new UpdateToLatestLedgerRequest();

    addresses.forEach(address => {
      const requestItem = new RequestItem();
      const getAccountStateRequest = new GetAccountStateRequest();
      getAccountStateRequest.setAddress(Uint8Array.from(Buffer.from(address, 'hex')));
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
              return this._decodeAccountStateBlob(blob);
            }

            return AccountState.default(addresses[index]);
          }),
        );
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
    const serverHost = this.config.faucetServerHost || DefaultFaucetServerHost;
    const coins = new BigNumber(numCoins).toString(10);
    const address = receiver.toString();
    const response = await axios.get(`http://${serverHost}?amount=${coins}&address=${address}`);

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
      }, 500);
    };

    return new Promise((resolve, reject) => {
      poll(resolve, reject);
    });
  }

  /**
   * Transfer coins from sender to receipient.
   * numCoins should be in libraCoins based unit.
   *
   * @param sender
   * @param recipientAddress
   * @param numCoins
   */
  public async transferCoins(
    sender: Account,
    recipientAddress: string,
    numCoins: number | string | BigNumber,
  ): Promise<SubmitTransactionResponse> {
    return await this.execute(
        LibraTransaction.createTransfer(recipientAddress, new BigNumber(numCoins)),
        sender,
    );
  }

  /**
   * Execute a transaction by sender.
   *
   * @param transaction
   * @param sender
   */
  public async execute(transaction: LibraTransaction, sender: Account): Promise<SubmitTransactionResponse> {
    let senderAddress = transaction.sendersAddress;
    if (senderAddress.isDefault()) {
        senderAddress = sender.getAddress();
    }
    let sequenceNumber = transaction.sequenceNumber;
    if (sequenceNumber.isNegative()) {
      const senderAccountState = await this.getAccountState(senderAddress.toHex());
      sequenceNumber = senderAccountState.sequenceNumber;
    }

    // Still working on this part
    const program = new Program();
    program.setCode(transaction.program.code);
    const transactionArguments = new Array<TransactionArgument>();
    transaction.program.arguments.forEach(argument => {
        const transactionArgument = new TransactionArgument();
        transactionArgument.setType(argument.type);
        transactionArgument.setData(argument.value);
        transactionArguments.push(transactionArgument);
    });
    program.setArgumentsList(transactionArguments);
    program.setModulesList(transaction.program.modules);
    const rawTransaction = new RawTransaction();
    rawTransaction.setExpirationTime(transaction.expirationTime.toNumber());
    rawTransaction.setGasUnitPrice(transaction.gasContraint.gasUnitPrice.toNumber());
    rawTransaction.setMaxGasAmount(transaction.gasContraint.maxGasAmount.toNumber());
    rawTransaction.setSequenceNumber(sequenceNumber.toNumber());
    rawTransaction.setProgram(program);
    rawTransaction.setSenderAccount(senderAddress.toBytes());

    const signedTransaction = new SignedTransaction();

    const request = new SubmitTransactionRequest();
    const rawTxnBytes = rawTransaction.serializeBinary();
    const hash = new SHA3(256)
        .update(Buffer.from(HashSaltValues.rawTransactionHashSalt, 'hex'))
        .update(Buffer.from(rawTxnBytes.buffer))
        .digest();
    const senderSignature = sender.keyPair.sign(hash);
    signedTransaction.setRawTxnBytes(rawTxnBytes);
    signedTransaction.setSenderPublicKey(sender.keyPair.getPublicKey());
    signedTransaction.setSenderSignature(senderSignature);

    request.setSignedTxn(signedTransaction);
    return new Promise((resolve, reject) => {
      this.client.submitTransaction(request, (error: ServiceError | null, response: SubmitTransactionResponse) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      });
    });
  }

  private _decodeAccountStateBlob(blob: Uint8Array): AccountState {
    const cursor = new CursorBuffer(blob);
    const blobLen = cursor.read32();

    const state: { [key: string]: Uint8Array } = {};

    for (let i = 0; i < blobLen; i++) {
      const keyLen = cursor.read32();
      const keyBuffer = new Uint8Array(keyLen);
      for (let j = 0; j < keyLen; j++) {
        keyBuffer[j] = cursor.read8();
      }

      const valueLen = cursor.read32();
      const valueBuffer = new Uint8Array(valueLen);
      for (let k = 0; k < valueLen; k++) {
        valueBuffer[k] = cursor.read8();
      }

      state[Buffer.from(keyBuffer).toString('hex')] = valueBuffer;
    }

    return AccountState.from(state[PathValues.AccountStatePath]);
  }
}

export default LibraClient;
