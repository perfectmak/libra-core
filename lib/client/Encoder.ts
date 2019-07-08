import { LibraTransaction } from '..';

import { AccountAddress } from '../wallet/Accounts';

import LibraClient from '.';
import { Program, RawTransaction, TransactionArgument } from '../__generated__/transaction_pb';

/**
 * Internal class used by LibraClient
 * to encode Libra* classes exposed by library into pb classes used with rbc
 */
export class ClientEncoder {
  private readonly client: LibraClient;

  constructor(client: LibraClient) {
    this.client = client;
  }

  public async encodeLibraTransaction(
    transaction: LibraTransaction,
    senderAccountAddress: AccountAddress,
  ): Promise<RawTransaction> {
    let senderAddress = transaction.sendersAddress;
    if (senderAddress.isDefault()) {
      senderAddress = senderAccountAddress;
    }
    let sequenceNumber = transaction.sequenceNumber;
    if (sequenceNumber.isNegative()) {
      const senderAccountState = await this.client.getAccountState(senderAddress.toHex());
      sequenceNumber = senderAccountState.sequenceNumber;
    }

    const program = new Program();
    program.setCode(transaction.program.code);
    const transactionArguments = new Array<TransactionArgument>();
    transaction.program.arguments.forEach(argument => {
      const transactionArgument = new TransactionArgument();
      transactionArgument.setType((argument.type as unknown) as TransactionArgument.ArgType);
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

    return rawTransaction;
  }
}
