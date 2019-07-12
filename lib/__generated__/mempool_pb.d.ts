// package: mempool
// file: mempool.proto

/* tslint:disable */

import * as jspb from 'google-protobuf';
import * as transaction_pb from './transaction_pb';
import * as mempool_status_pb from './mempool_status_pb';

export class AddTransactionWithValidationRequest extends jspb.Message {
  hasSignedTxn(): boolean;
  clearSignedTxn(): void;
  getSignedTxn(): transaction_pb.SignedTransaction | undefined;
  setSignedTxn(value?: transaction_pb.SignedTransaction): void;

  getMaxGasCost(): string;
  setMaxGasCost(value: string): void;

  getLatestSequenceNumber(): string;
  setLatestSequenceNumber(value: string): void;

  getAccountBalance(): string;
  setAccountBalance(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddTransactionWithValidationRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: AddTransactionWithValidationRequest,
  ): AddTransactionWithValidationRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: AddTransactionWithValidationRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddTransactionWithValidationRequest;
  static deserializeBinaryFromReader(
    message: AddTransactionWithValidationRequest,
    reader: jspb.BinaryReader,
  ): AddTransactionWithValidationRequest;
}

export namespace AddTransactionWithValidationRequest {
  export type AsObject = {
    signedTxn?: transaction_pb.SignedTransaction.AsObject;
    maxGasCost: string;
    latestSequenceNumber: string;
    accountBalance: string;
  };
}

export class AddTransactionWithValidationResponse extends jspb.Message {
  getCurrentVersion(): string;
  setCurrentVersion(value: string): void;

  hasStatus(): boolean;
  clearStatus(): void;
  getStatus(): mempool_status_pb.MempoolAddTransactionStatus | undefined;
  setStatus(value?: mempool_status_pb.MempoolAddTransactionStatus): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddTransactionWithValidationResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: AddTransactionWithValidationResponse,
  ): AddTransactionWithValidationResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: AddTransactionWithValidationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddTransactionWithValidationResponse;
  static deserializeBinaryFromReader(
    message: AddTransactionWithValidationResponse,
    reader: jspb.BinaryReader,
  ): AddTransactionWithValidationResponse;
}

export namespace AddTransactionWithValidationResponse {
  export type AsObject = {
    currentVersion: string;
    status?: mempool_status_pb.MempoolAddTransactionStatus.AsObject;
  };
}

export class GetBlockRequest extends jspb.Message {
  getMaxBlockSize(): string;
  setMaxBlockSize(value: string): void;

  clearTransactionsList(): void;
  getTransactionsList(): Array<TransactionExclusion>;
  setTransactionsList(value: Array<TransactionExclusion>): void;
  addTransactions(value?: TransactionExclusion, index?: number): TransactionExclusion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBlockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBlockRequest): GetBlockRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: GetBlockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBlockRequest;
  static deserializeBinaryFromReader(message: GetBlockRequest, reader: jspb.BinaryReader): GetBlockRequest;
}

export namespace GetBlockRequest {
  export type AsObject = {
    maxBlockSize: string;
    transactionsList: Array<TransactionExclusion.AsObject>;
  };
}

export class GetBlockResponse extends jspb.Message {
  hasBlock(): boolean;
  clearBlock(): void;
  getBlock(): transaction_pb.SignedTransactionsBlock | undefined;
  setBlock(value?: transaction_pb.SignedTransactionsBlock): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBlockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetBlockResponse): GetBlockResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: GetBlockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBlockResponse;
  static deserializeBinaryFromReader(message: GetBlockResponse, reader: jspb.BinaryReader): GetBlockResponse;
}

export namespace GetBlockResponse {
  export type AsObject = {
    block?: transaction_pb.SignedTransactionsBlock.AsObject;
  };
}

export class TransactionExclusion extends jspb.Message {
  getSender(): Uint8Array | string;
  getSender_asU8(): Uint8Array;
  getSender_asB64(): string;
  setSender(value: Uint8Array | string): void;

  getSequenceNumber(): string;
  setSequenceNumber(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionExclusion.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionExclusion): TransactionExclusion.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: TransactionExclusion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionExclusion;
  static deserializeBinaryFromReader(message: TransactionExclusion, reader: jspb.BinaryReader): TransactionExclusion;
}

export namespace TransactionExclusion {
  export type AsObject = {
    sender: Uint8Array | string;
    sequenceNumber: string;
  };
}

export class CommitTransactionsRequest extends jspb.Message {
  clearTransactionsList(): void;
  getTransactionsList(): Array<CommittedTransaction>;
  setTransactionsList(value: Array<CommittedTransaction>): void;
  addTransactions(value?: CommittedTransaction, index?: number): CommittedTransaction;

  getBlockTimestampUsecs(): string;
  setBlockTimestampUsecs(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommitTransactionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CommitTransactionsRequest): CommitTransactionsRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: CommitTransactionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommitTransactionsRequest;
  static deserializeBinaryFromReader(
    message: CommitTransactionsRequest,
    reader: jspb.BinaryReader,
  ): CommitTransactionsRequest;
}

export namespace CommitTransactionsRequest {
  export type AsObject = {
    transactionsList: Array<CommittedTransaction.AsObject>;
    blockTimestampUsecs: string;
  };
}

export class CommitTransactionsResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommitTransactionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CommitTransactionsResponse): CommitTransactionsResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: CommitTransactionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommitTransactionsResponse;
  static deserializeBinaryFromReader(
    message: CommitTransactionsResponse,
    reader: jspb.BinaryReader,
  ): CommitTransactionsResponse;
}

export namespace CommitTransactionsResponse {
  export type AsObject = {};
}

export class CommittedTransaction extends jspb.Message {
  getSender(): Uint8Array | string;
  getSender_asU8(): Uint8Array;
  getSender_asB64(): string;
  setSender(value: Uint8Array | string): void;

  getSequenceNumber(): string;
  setSequenceNumber(value: string): void;

  getIsRejected(): boolean;
  setIsRejected(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommittedTransaction.AsObject;
  static toObject(includeInstance: boolean, msg: CommittedTransaction): CommittedTransaction.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: CommittedTransaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommittedTransaction;
  static deserializeBinaryFromReader(message: CommittedTransaction, reader: jspb.BinaryReader): CommittedTransaction;
}

export namespace CommittedTransaction {
  export type AsObject = {
    sender: Uint8Array | string;
    sequenceNumber: string;
    isRejected: boolean;
  };
}

export class HealthCheckRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HealthCheckRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HealthCheckRequest): HealthCheckRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: HealthCheckRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HealthCheckRequest;
  static deserializeBinaryFromReader(message: HealthCheckRequest, reader: jspb.BinaryReader): HealthCheckRequest;
}

export namespace HealthCheckRequest {
  export type AsObject = {};
}

export class HealthCheckResponse extends jspb.Message {
  getIsHealthy(): boolean;
  setIsHealthy(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HealthCheckResponse.AsObject;
  static toObject(includeInstance: boolean, msg: HealthCheckResponse): HealthCheckResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: HealthCheckResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HealthCheckResponse;
  static deserializeBinaryFromReader(message: HealthCheckResponse, reader: jspb.BinaryReader): HealthCheckResponse;
}

export namespace HealthCheckResponse {
  export type AsObject = {
    isHealthy: boolean;
  };
}
