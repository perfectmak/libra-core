import { credentials } from 'grpc'
import BigNumber from 'bignumber.js';
import axios from 'axios';
import { AdmissionControlClient } from './__generated__/admission_control_grpc_pb'
import { UpdateToLatestLedgerRequest, ResponseItem, GetAccountStateResponse, RequestItem, GetAccountStateRequest } from './__generated__/get_with_proof_pb';
import { AccountStateWithProof, AccountStateBlob } from './__generated__/account_state_blob_pb';
import { CursorBuffer } from './common/CursorBuffer';
import { AccountState, AccountStates, AccountAddress } from './wallet/Accounts';
import PathValues from './constants/PathValues';

const DefaultFaucetServerHost = 'faucet.testnet.libra.org';
const DefaultTestnetServerHost = 'ac.testnet.libra.org';

interface LibralLibConfig {
  port: string,
  host: string,
  faucetServerHost?: string,
  validatorSetFile?: string,
}

export class LiberaClient {
  private readonly _config: LibralLibConfig;
  private readonly _client: AdmissionControlClient;

  constructor(config: LibralLibConfig) {
    this._config = config;

    const connectionAddress = `${config.host}:${config.port}`;
    this._client = new AdmissionControlClient(connectionAddress, credentials.createInsecure());
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
    for (let address of addresses) {
      if (!AccountAddress.isValidString(address)) {
        throw new Error(`[${address}] is not a valid address`);
      }
    }

    const request = new UpdateToLatestLedgerRequest();

    addresses.forEach(address => {
      const requestItem = new RequestItem();
      const getAccountStateRequest = new GetAccountStateRequest();
      getAccountStateRequest.setAddress(Uint8Array.from(Buffer.from(address, 'hex')));
      requestItem.setGetAccountStateRequest(getAccountStateRequest)
      request.addRequestedItems(requestItem);
    })

    return new Promise<AccountStates>((resolve, reject) => {
      this._client.updateToLatestLedger(request, (error, response) => {
        if (error) {
          return reject(error);
        }

        resolve(response.getResponseItemsList().map((item: ResponseItem, index: number) => {
          const stateResponse = item.getGetAccountStateResponse() as GetAccountStateResponse;
          const stateWithProof = stateResponse.getAccountStateWithProof() as AccountStateWithProof;
          if (stateWithProof.hasBlob()) {
            const stateBlob = stateWithProof.getBlob() as AccountStateBlob;
            const blob = stateBlob.getBlob_asU8();
            const accountState = this._decodeAccountStateBlob(blob);
            return accountState;
          }

          return AccountState.default(addresses[index]);
        }))
      })
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
    const serverHost = this._config.faucetServerHost || DefaultFaucetServerHost;
    const coins = new BigNumber(numCoins).toString(10);
    const address = receiver.toString();
    const response = await axios.get(`http://${serverHost}?amount=${coins}&address=${address}`);

    if (response.status !== 200) {
      throw new Error(`Failed to query faucet service. Code: ${response.status}, Err: ${response.data.toString()}`)
    }
    const sequenceNumber = response.data as string
    console.log('gotten response sequence', sequenceNumber);

    if (waitForConfirmation) {
      await this.waitForConfirmation(AccountAddress.default(), sequenceNumber);
    }

    return sequenceNumber;
  }

  /**
   * Keeps polling the account state of address till sequenceNumber is computed.
   * 
   */
  public async waitForConfirmation(_address: AccountAddress | string, _sequenceNumber: BigNumber | string | number): Promise<void> {
    const sequenceNumber = new BigNumber(_sequenceNumber);
    const address = _address.toString();
    let maxIterations = 20;

    const poll = (
      resolve: (value?: void | PromiseLike<void>) => void,
      reject: (reason?: Error) => void
    ) => {
      setTimeout(() => {
        maxIterations--;
        this.getAccountState(address)
          .then(accountState => {
            if (accountState.sequenceNumber.eq(sequenceNumber)) {
              return resolve();
            }

            if (maxIterations == -1) {
              reject(new Error(`Confirmation timeout for [${address}]:[${sequenceNumber.toString(10)}]`))
            } else {
              poll(resolve, reject);
            }
          })
          .catch(reject)
      }, 500);
    };

    return new Promise((resolve, reject) => {
      poll(resolve, reject)
    })
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

export default LiberaClient