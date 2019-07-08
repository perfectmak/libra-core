import BigNumber from 'bignumber.js';
import { TransactionArgument } from './__generated__/transaction_pb';
import LibraClient from './client';
import Addresses from './constants/Addresses';
import ProgamBase64Codes from './constants/ProgamBase64Codes';
import { LibraVMStatusError } from './transaction/Errors';
import { AccountAddress } from './wallet/Accounts';

interface LibraProgram {
  code: Uint8Array;
  arguments: LibraProgramArgument[];
  modules: Uint8Array[];
}

interface LibraProgramArgument {
  type: TransactionArgument.ArgType;
  value: Uint8Array;
}

interface LibraGasConstraint {
  maxGasAmount: BigNumber;
  gasUnitPrice: BigNumber;
}

export class LibraTransaction {
  public static createTransfer(recipientAddress: string, numAccount: BigNumber): LibraTransaction {
    const amountBuffer = Buffer.alloc(8);
    amountBuffer.writeBigUInt64LE(BigInt(numAccount), 0);
    const programArguments: LibraProgramArgument[] = [
      {
        type: TransactionArgument.ArgType.ADDRESS,
        value: Uint8Array.from(Buffer.from(recipientAddress, 'hex')),
      },
      {
        type: TransactionArgument.ArgType.U64,
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
  // TODO(perfectmak): Change LibraTransaction to LibraSignedTransaction
  public readonly transaction: LibraTransaction;
  public readonly validatorId: Uint8Array;
  public readonly acStatus?: LibraAdmissionControlStatus;
  public readonly mempoolStatus?: LibraMempoolTransactionStatus;
  public readonly vmStatus?: LibraVMStatusError;

  constructor(
    transaction: LibraTransaction,
    validatorId: Uint8Array,
    acStatus?: LibraAdmissionControlStatus | number,
    mempoolStatus?: LibraMempoolTransactionStatus | number,
    vmStatus?: LibraVMStatusError,
  ) {
    this.transaction = transaction;
    this.validatorId = validatorId;
    this.acStatus = acStatus;
    this.mempoolStatus = mempoolStatus;
    this.vmStatus = vmStatus;
  }

  public async awaitConfirmation(client: LibraClient): Promise<void> {
    return client.waitForConfirmation(
      this.transaction.sendersAddress,
      this.transaction.sequenceNumber.plus(1)
    );
  }

  // TODO: Add some more helper methods to extract reason of failure
}

export enum LibraAdmissionControlStatus {
  ACCEPTED = 0,
  BLACKLISTED = 1,
  REJECTED = 2,
}

export enum LibraMempoolTransactionStatus {
  VALID = 0,
  INSUFFICIENTBALANCE = 1,
  INVALIDSEQNUMBER = 2,
  MEMPOOLISFULL = 3,
  TOOMANYTRANSACTIONS = 4,
  INVALIDUPDATE = 5,
}
