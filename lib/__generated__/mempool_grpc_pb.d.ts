// package: mempool
// file: mempool.proto

/* tslint:disable */

import * as grpc from 'grpc';
import * as mempool_pb from './mempool_pb';
import * as transaction_pb from './transaction_pb';
import * as mempool_status_pb from './mempool_status_pb';

interface IMempoolService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  addTransactionWithValidation: IMempoolService_IAddTransactionWithValidation;
  getBlock: IMempoolService_IGetBlock;
  commitTransactions: IMempoolService_ICommitTransactions;
  healthCheck: IMempoolService_IHealthCheck;
}

interface IMempoolService_IAddTransactionWithValidation
  extends grpc.MethodDefinition<
    mempool_pb.AddTransactionWithValidationRequest,
    mempool_pb.AddTransactionWithValidationResponse
  > {
  path: string; // "/mempool.Mempool/AddTransactionWithValidation"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<mempool_pb.AddTransactionWithValidationRequest>;
  requestDeserialize: grpc.deserialize<mempool_pb.AddTransactionWithValidationRequest>;
  responseSerialize: grpc.serialize<mempool_pb.AddTransactionWithValidationResponse>;
  responseDeserialize: grpc.deserialize<mempool_pb.AddTransactionWithValidationResponse>;
}
interface IMempoolService_IGetBlock
  extends grpc.MethodDefinition<mempool_pb.GetBlockRequest, mempool_pb.GetBlockResponse> {
  path: string; // "/mempool.Mempool/GetBlock"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<mempool_pb.GetBlockRequest>;
  requestDeserialize: grpc.deserialize<mempool_pb.GetBlockRequest>;
  responseSerialize: grpc.serialize<mempool_pb.GetBlockResponse>;
  responseDeserialize: grpc.deserialize<mempool_pb.GetBlockResponse>;
}
interface IMempoolService_ICommitTransactions
  extends grpc.MethodDefinition<mempool_pb.CommitTransactionsRequest, mempool_pb.CommitTransactionsResponse> {
  path: string; // "/mempool.Mempool/CommitTransactions"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<mempool_pb.CommitTransactionsRequest>;
  requestDeserialize: grpc.deserialize<mempool_pb.CommitTransactionsRequest>;
  responseSerialize: grpc.serialize<mempool_pb.CommitTransactionsResponse>;
  responseDeserialize: grpc.deserialize<mempool_pb.CommitTransactionsResponse>;
}
interface IMempoolService_IHealthCheck
  extends grpc.MethodDefinition<mempool_pb.HealthCheckRequest, mempool_pb.HealthCheckResponse> {
  path: string; // "/mempool.Mempool/HealthCheck"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<mempool_pb.HealthCheckRequest>;
  requestDeserialize: grpc.deserialize<mempool_pb.HealthCheckRequest>;
  responseSerialize: grpc.serialize<mempool_pb.HealthCheckResponse>;
  responseDeserialize: grpc.deserialize<mempool_pb.HealthCheckResponse>;
}

export const MempoolService: IMempoolService;

export interface IMempoolServer {
  addTransactionWithValidation: grpc.handleUnaryCall<
    mempool_pb.AddTransactionWithValidationRequest,
    mempool_pb.AddTransactionWithValidationResponse
  >;
  getBlock: grpc.handleUnaryCall<mempool_pb.GetBlockRequest, mempool_pb.GetBlockResponse>;
  commitTransactions: grpc.handleUnaryCall<mempool_pb.CommitTransactionsRequest, mempool_pb.CommitTransactionsResponse>;
  healthCheck: grpc.handleUnaryCall<mempool_pb.HealthCheckRequest, mempool_pb.HealthCheckResponse>;
}

export interface IMempoolClient {
  addTransactionWithValidation(
    request: mempool_pb.AddTransactionWithValidationRequest,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.AddTransactionWithValidationResponse) => void,
  ): grpc.ClientUnaryCall;
  addTransactionWithValidation(
    request: mempool_pb.AddTransactionWithValidationRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.AddTransactionWithValidationResponse) => void,
  ): grpc.ClientUnaryCall;
  addTransactionWithValidation(
    request: mempool_pb.AddTransactionWithValidationRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.AddTransactionWithValidationResponse) => void,
  ): grpc.ClientUnaryCall;
  getBlock(
    request: mempool_pb.GetBlockRequest,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.GetBlockResponse) => void,
  ): grpc.ClientUnaryCall;
  getBlock(
    request: mempool_pb.GetBlockRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.GetBlockResponse) => void,
  ): grpc.ClientUnaryCall;
  getBlock(
    request: mempool_pb.GetBlockRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.GetBlockResponse) => void,
  ): grpc.ClientUnaryCall;
  commitTransactions(
    request: mempool_pb.CommitTransactionsRequest,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.CommitTransactionsResponse) => void,
  ): grpc.ClientUnaryCall;
  commitTransactions(
    request: mempool_pb.CommitTransactionsRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.CommitTransactionsResponse) => void,
  ): grpc.ClientUnaryCall;
  commitTransactions(
    request: mempool_pb.CommitTransactionsRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.CommitTransactionsResponse) => void,
  ): grpc.ClientUnaryCall;
  healthCheck(
    request: mempool_pb.HealthCheckRequest,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.HealthCheckResponse) => void,
  ): grpc.ClientUnaryCall;
  healthCheck(
    request: mempool_pb.HealthCheckRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.HealthCheckResponse) => void,
  ): grpc.ClientUnaryCall;
  healthCheck(
    request: mempool_pb.HealthCheckRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.HealthCheckResponse) => void,
  ): grpc.ClientUnaryCall;
}

export class MempoolClient extends grpc.Client implements IMempoolClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  public addTransactionWithValidation(
    request: mempool_pb.AddTransactionWithValidationRequest,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.AddTransactionWithValidationResponse) => void,
  ): grpc.ClientUnaryCall;
  public addTransactionWithValidation(
    request: mempool_pb.AddTransactionWithValidationRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.AddTransactionWithValidationResponse) => void,
  ): grpc.ClientUnaryCall;
  public addTransactionWithValidation(
    request: mempool_pb.AddTransactionWithValidationRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.AddTransactionWithValidationResponse) => void,
  ): grpc.ClientUnaryCall;
  public getBlock(
    request: mempool_pb.GetBlockRequest,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.GetBlockResponse) => void,
  ): grpc.ClientUnaryCall;
  public getBlock(
    request: mempool_pb.GetBlockRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.GetBlockResponse) => void,
  ): grpc.ClientUnaryCall;
  public getBlock(
    request: mempool_pb.GetBlockRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.GetBlockResponse) => void,
  ): grpc.ClientUnaryCall;
  public commitTransactions(
    request: mempool_pb.CommitTransactionsRequest,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.CommitTransactionsResponse) => void,
  ): grpc.ClientUnaryCall;
  public commitTransactions(
    request: mempool_pb.CommitTransactionsRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.CommitTransactionsResponse) => void,
  ): grpc.ClientUnaryCall;
  public commitTransactions(
    request: mempool_pb.CommitTransactionsRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.CommitTransactionsResponse) => void,
  ): grpc.ClientUnaryCall;
  public healthCheck(
    request: mempool_pb.HealthCheckRequest,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.HealthCheckResponse) => void,
  ): grpc.ClientUnaryCall;
  public healthCheck(
    request: mempool_pb.HealthCheckRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.HealthCheckResponse) => void,
  ): grpc.ClientUnaryCall;
  public healthCheck(
    request: mempool_pb.HealthCheckRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: mempool_pb.HealthCheckResponse) => void,
  ): grpc.ClientUnaryCall;
}
