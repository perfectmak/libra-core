import BigNumber from 'bignumber.js';
import LibraClient from '../client';
import Addresses from '../constants/Addresses';
import ProgamBase64Codes from '../constants/ProgamBase64Codes';
import { AccountAddress } from '../wallet/Accounts';
import { LibraVMStatusError } from './Errors';

export interface LibraProgram {
  code: Uint8Array;
  arguments: LibraProgramArgument[];
  modules: Uint8Array[];
}

interface LibraProgramArgument {
  type: LibraProgramArgumentType;
  value: Uint8Array;
}

export enum LibraProgramArgumentType {
  U64 = 0,
  ADDRESS = 1,
  STRING = 2,
  BYTEARRAY = 3,
}

export interface LibraGasConstraint {
  maxGasAmount: BigNumber;
  gasUnitPrice: BigNumber;
}

export class LibraTransaction {
  public static createTransfer(recipientAddress: string, numAccount: BigNumber): LibraTransaction {
    const amountBuffer = Buffer.alloc(8);
    amountBuffer.writeBigUInt64LE(BigInt(numAccount), 0);
    const programArguments: LibraProgramArgument[] = [
      {
        type: LibraProgramArgumentType.ADDRESS,
        value: Uint8Array.from(Buffer.from(recipientAddress, 'hex')),
      },
      {
        type: LibraProgramArgumentType.U64,
        value: Uint8Array.from(amountBuffer),
      },
    ];
    const program: LibraProgram = {
      arguments: programArguments,
      code: Uint8Array.from(Buffer.from(ProgamBase64Codes.peerToPeerTxn, 'base64')),
      modules: [],
    };
    return new LibraTransaction(
      program,
      {
        gasUnitPrice: new BigNumber(0),
        maxGasAmount: new BigNumber(1000000),
      },
      `${Math.floor(new Date().getTime() / 1000) + 100}`,
      new Uint8Array(Addresses.AddressLength),
      '-1',
    );
  }

  // NOTE: Ensure this raw bytes is always set used internally
  public program: LibraProgram;
  public gasContraint: LibraGasConstraint;
  public expirationTime: BigNumber;
  public sendersAddress: AccountAddress;
  public sequenceNumber: BigNumber;

  /**
   * Create a new Transaction
   *
   * @param program
   * @param gasConstraint
   * @param expirationTime
   * @param sendersAddress
   * @param sequenceNumber
   */
  constructor(
    program: LibraProgram,
    gasConstraint: LibraGasConstraint,
    expirationTime: string | BigNumber,
    sendersAddress: Uint8Array,
    sequenceNumber: string | BigNumber,
  ) {
    this.program = program;
    this.gasContraint = gasConstraint;
    this.expirationTime = new BigNumber(expirationTime);
    this.sendersAddress = new AccountAddress(sendersAddress);
    this.sequenceNumber = new BigNumber(sequenceNumber);
  }
}

export class LibraTransactionResponse {
  public readonly signedTransaction: LibraSignedTransaction;
  public readonly validatorId: Uint8Array;
  public readonly acStatus?: LibraAdmissionControlStatus;
  public readonly mempoolStatus?: LibraMempoolTransactionStatus;
  public readonly vmStatus?: LibraVMStatusError;

  constructor(
    signedTransaction: LibraSignedTransaction,
    validatorId: Uint8Array,
    acStatus?: LibraAdmissionControlStatus | number,
    mempoolStatus?: LibraMempoolTransactionStatus | number,
    vmStatus?: LibraVMStatusError,
  ) {
    this.signedTransaction = signedTransaction;
    this.validatorId = validatorId;
    this.acStatus = acStatus;
    this.mempoolStatus = mempoolStatus;
    this.vmStatus = vmStatus;
  }

  public async awaitConfirmation(client: LibraClient): Promise<void> {
    return client.waitForConfirmation(
      this.signedTransaction.transaction.sendersAddress,
      this.signedTransaction.transaction.sequenceNumber.plus(1),
    );
  }
}

export enum LibraAdmissionControlStatus {
  ACCEPTED = 0,
  BLACKLISTED = 1,
  REJECTED = 2,
  UNKNOWN = -1,
}

export enum LibraMempoolTransactionStatus {
  VALID = 0,
  INSUFFICIENTBALANCE = 1,
  INVALIDSEQNUMBER = 2,
  MEMPOOLISFULL = 3,
  TOOMANYTRANSACTIONS = 4,
  INVALIDUPDATE = 5,
  UNKNOWN = -1,
}
export class LibraSignedTransaction {
  public readonly transaction: LibraTransaction;
  public readonly publicKey: Uint8Array;
  public readonly signature: Uint8Array;

  constructor(transaction: LibraTransaction, publicKey: Uint8Array, signature: Uint8Array) {
    this.transaction = transaction;
    this.publicKey = publicKey;
    this.signature = signature;
  }
}

export class LibraSignedTransactionWithProof {
  public readonly signedTransaction: LibraSignedTransaction;
  public readonly proof?: LibraSignedTransactionProof;
  public readonly events?: LibraTransactionEvent[];

  constructor(signedTransaction: LibraSignedTransaction, proof?: object, events?: LibraTransactionEvent[]) {
    this.signedTransaction = signedTransaction;
    this.proof = proof;
    this.events = events;
  }
}

// TODO: Implement abstraction over the pb classes for transaction proof
class LibraSignedTransactionProof {}

export class LibraTransactionEvent {
  public readonly data: Uint8Array; // eventData
  public readonly sequenceNumber: BigNumber;
  public readonly eventKey?: Uint8Array;

  constructor(data: Uint8Array, sequenceNumber: BigNumber | string, eventKey?: Uint8Array) {
    this.data = data;
    this.sequenceNumber = new BigNumber(sequenceNumber);
    this.eventKey = eventKey;
  }
}
