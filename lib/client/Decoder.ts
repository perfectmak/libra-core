import {
  Program,
  RawTransaction,
  SignedTransaction,
  SignedTransactionWithProof,
} from '../__generated__/transaction_pb';

import { CursorBuffer } from '../common/CursorBuffer';

import PathValues from '../constants/PathValues';

import {
  LibraDeserializationError,
  LibraExecutionError,
  LibraExecutionErrorType,
  LibraGasConstraint,
  LibraInvariantViolationError,
  LibraProgram,
  LibraProgramArgumentType,
  LibraSignedTransaction,
  LibraSignedTransactionWithProof,
  LibraTransaction,
  LibraTransactionEvent,
  LibraValidationStatusCode,
  LibraValidationStatusError,
  LibraVerificationError,
  LibraVerificationStatusError,
  LibraVerificationStatusKind,
  LibraVMStatusError,
} from '..';

import { EventsList } from '../__generated__/events_pb';

import { AccountAddress, AccountState } from '../wallet/Accounts';

import { AccessPath } from '../__generated__/access_path_pb';

import BigNumber from 'bignumber.js';

import {
  BinaryError,
  ExecutionStatus,
  VMInvariantViolationError,
  VMStatus,
  VMValidationStatus,
  VMVerificationStatusList,
} from '../__generated__/vm_errors_pb';

/**
 * Internal class used by LibraClient
 * to decode pb generated classes to Libra* Classes export by this library
 *
 */
export class ClientDecoder {
  public decodeAccountStateBlob(blob: Uint8Array): AccountState {
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

    return AccountState.fromBytes(state[PathValues.AccountStatePath]);
  }

  public decodeSignedTransactionWithProof(
    signedTransactionWP: SignedTransactionWithProof,
  ): LibraSignedTransactionWithProof {
    // decode transaction
    const signedTransaction = signedTransactionWP.getSignedTransaction() as SignedTransaction;
    const libraTransaction = this.decodeRawTransactionBytes(signedTransaction.getRawTxnBytes_asU8());

    const libraSignedtransaction = new LibraSignedTransaction(
      libraTransaction,
      signedTransaction.getSenderPublicKey_asU8(),
      signedTransaction.getSenderSignature_asU8(),
    );

    // decode event
    let eventsList: LibraTransactionEvent[] | undefined;
    if (signedTransactionWP.hasEvents()) {
      const events = signedTransactionWP.getEvents() as EventsList;
      eventsList = events.getEventsList().map(event => {
        let key: Uint8Array | undefined;

        key = event.getKey_asU8();

        return new LibraTransactionEvent(
          event.getEventData_asU8(),
          new BigNumber(event.getSequenceNumber()),
          key,
        );
      });
    }

    return new LibraSignedTransactionWithProof(libraSignedtransaction, signedTransactionWP.getProof(), eventsList);
  }

  public decodeRawTransactionBytes(rawTxnBytes: Uint8Array): LibraTransaction {
    const rawTxn = RawTransaction.deserializeBinary(rawTxnBytes);
    const rawProgram = rawTxn.getProgram() as Program;

    const program: LibraProgram = {
      arguments: rawProgram.getArgumentsList().map(argument => ({
        type: (argument.getType() as unknown) as LibraProgramArgumentType,
        value: argument.getData_asU8(),
      })),
      code: rawProgram.getCode_asU8(),
      modules: rawProgram.getModulesList_asU8(),
    };

    const gasContraint: LibraGasConstraint = {
      gasUnitPrice: new BigNumber(rawTxn.getGasUnitPrice()),
      maxGasAmount: new BigNumber(rawTxn.getMaxGasAmount()),
    };

    return new LibraTransaction(
      program,
      gasContraint,
      new BigNumber(rawTxn.getExpirationTime()),
      rawTxn.getSenderAccount_asU8(),
      new BigNumber(rawTxn.getSequenceNumber()),
    );
  }

  public decodeVMStatus(vmStatus?: VMStatus): LibraVMStatusError | undefined {
    if (vmStatus === undefined) {
      return undefined;
    }

    let validationStatus: LibraValidationStatusError | undefined;
    let verificationStatusErrors: LibraVerificationStatusError[] | undefined;
    let invariantViolationError: LibraInvariantViolationError | undefined;
    let deserializationError: LibraDeserializationError | undefined;
    let executionError: LibraExecutionError | undefined;

    if (vmStatus.hasValidation()) {
      const validation = vmStatus.getValidation() as VMValidationStatus;
      validationStatus = {
        code: (validation.getCode() as unknown) as LibraValidationStatusCode,
        message: validation.getMessage(),
      };
    }

    if (vmStatus.hasVerification()) {
      const verification = vmStatus.getVerification() as VMVerificationStatusList;
      verificationStatusErrors = verification.getStatusListList().map(status => {
        return new LibraVerificationStatusError(
          (status.getErrorKind() as unknown) as LibraVerificationStatusKind,
          status.getModuleIdx(),
          (status.getErrorKind() as unknown) as LibraVerificationError,
          status.getMessage(),
        );
      });
    }

    if (vmStatus.hasInvariantViolation()) {
      const invariant = vmStatus.getInvariantViolation() as VMInvariantViolationError;
      invariantViolationError = (invariant as unknown) as LibraInvariantViolationError;
    }

    if (vmStatus.hasDeserialization()) {
      const deser = vmStatus.getDeserialization() as BinaryError;
      deserializationError = (deser as unknown) as LibraDeserializationError;
    }

    if (vmStatus.hasExecution()) {
      const execution = vmStatus.getExecution() as ExecutionStatus;
      executionError = {
        errorType: (execution.getExecutionStatusCase() as unknown) as LibraExecutionErrorType,
      };
    }

    return new LibraVMStatusError(
      vmStatus.getErrorTypeCase(),
      validationStatus,
      verificationStatusErrors,
      invariantViolationError,
      deserializationError,
      executionError,
    );
  }
}
