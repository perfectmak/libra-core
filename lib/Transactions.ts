import BigNumber from 'bignumber.js';
import { AccountAddress } from './wallet/Accounts';

interface LibraProgram {
  code: Uint8Array;
  arguments: LibraProgramArgument[];
  modules: Uint8Array[];
}

interface LibraProgramArgument {
  type: string;
  value: Uint8Array;
}

interface LibraGasConstraint {
  maxGasAmount: BigNumber;
  gasUnitPrice: BigNumber;
}

export class LibraTransaction {
  public static createTransfer(receipientAddress: string, numAccount: BigNumber): LibraTransaction {
    throw new Error('Method not implemented. Still working on compiling and encoding programs');
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
