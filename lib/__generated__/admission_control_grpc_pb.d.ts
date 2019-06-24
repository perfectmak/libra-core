// package: admission_control
// file: admission_control.proto

/* tslint:disable */

import * as grpc from 'grpc';
import * as admission_control_pb from './admission_control_pb';
import * as get_with_proof_pb from './get_with_proof_pb';
import * as transaction_pb from './transaction_pb';
import * as proof_pb from './proof_pb';
import * as ledger_info_pb from './ledger_info_pb';
import * as vm_errors_pb from './vm_errors_pb';
import * as mempool_status_pb from './mempool_status_pb';

interface IAdmissionControlService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  submitTransaction: IAdmissionControlService_ISubmitTransaction;
  updateToLatestLedger: IAdmissionControlService_IUpdateToLatestLedger;
}

interface IAdmissionControlService_ISubmitTransaction
  extends grpc.MethodDefinition<
    admission_control_pb.SubmitTransactionRequest,
    admission_control_pb.SubmitTransactionResponse
  > {
  path: string; // "/admission_control.AdmissionControl/SubmitTransaction"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<admission_control_pb.SubmitTransactionRequest>;
  requestDeserialize: grpc.deserialize<admission_control_pb.SubmitTransactionRequest>;
  responseSerialize: grpc.serialize<admission_control_pb.SubmitTransactionResponse>;
  responseDeserialize: grpc.deserialize<admission_control_pb.SubmitTransactionResponse>;
}
interface IAdmissionControlService_IUpdateToLatestLedger
  extends grpc.MethodDefinition<
    get_with_proof_pb.UpdateToLatestLedgerRequest,
    get_with_proof_pb.UpdateToLatestLedgerResponse
  > {
  path: string; // "/admission_control.AdmissionControl/UpdateToLatestLedger"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<get_with_proof_pb.UpdateToLatestLedgerRequest>;
  requestDeserialize: grpc.deserialize<get_with_proof_pb.UpdateToLatestLedgerRequest>;
  responseSerialize: grpc.serialize<get_with_proof_pb.UpdateToLatestLedgerResponse>;
  responseDeserialize: grpc.deserialize<get_with_proof_pb.UpdateToLatestLedgerResponse>;
}

export const AdmissionControlService: IAdmissionControlService;

export interface IAdmissionControlServer {
  submitTransaction: grpc.handleUnaryCall<
    admission_control_pb.SubmitTransactionRequest,
    admission_control_pb.SubmitTransactionResponse
  >;
  updateToLatestLedger: grpc.handleUnaryCall<
    get_with_proof_pb.UpdateToLatestLedgerRequest,
    get_with_proof_pb.UpdateToLatestLedgerResponse
  >;
}

export interface IAdmissionControlClient {
  submitTransaction(
    request: admission_control_pb.SubmitTransactionRequest,
    callback: (error: grpc.ServiceError | null, response: admission_control_pb.SubmitTransactionResponse) => void,
  ): grpc.ClientUnaryCall;
  submitTransaction(
    request: admission_control_pb.SubmitTransactionRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: admission_control_pb.SubmitTransactionResponse) => void,
  ): grpc.ClientUnaryCall;
  submitTransaction(
    request: admission_control_pb.SubmitTransactionRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: admission_control_pb.SubmitTransactionResponse) => void,
  ): grpc.ClientUnaryCall;
  updateToLatestLedger(
    request: get_with_proof_pb.UpdateToLatestLedgerRequest,
    callback: (error: grpc.ServiceError | null, response: get_with_proof_pb.UpdateToLatestLedgerResponse) => void,
  ): grpc.ClientUnaryCall;
  updateToLatestLedger(
    request: get_with_proof_pb.UpdateToLatestLedgerRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: get_with_proof_pb.UpdateToLatestLedgerResponse) => void,
  ): grpc.ClientUnaryCall;
  updateToLatestLedger(
    request: get_with_proof_pb.UpdateToLatestLedgerRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: get_with_proof_pb.UpdateToLatestLedgerResponse) => void,
  ): grpc.ClientUnaryCall;
}

export class AdmissionControlClient extends grpc.Client implements IAdmissionControlClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  public submitTransaction(
    request: admission_control_pb.SubmitTransactionRequest,
    callback: (error: grpc.ServiceError | null, response: admission_control_pb.SubmitTransactionResponse) => void,
  ): grpc.ClientUnaryCall;
  public submitTransaction(
    request: admission_control_pb.SubmitTransactionRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: admission_control_pb.SubmitTransactionResponse) => void,
  ): grpc.ClientUnaryCall;
  public submitTransaction(
    request: admission_control_pb.SubmitTransactionRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: admission_control_pb.SubmitTransactionResponse) => void,
  ): grpc.ClientUnaryCall;
  public updateToLatestLedger(
    request: get_with_proof_pb.UpdateToLatestLedgerRequest,
    callback: (error: grpc.ServiceError | null, response: get_with_proof_pb.UpdateToLatestLedgerResponse) => void,
  ): grpc.ClientUnaryCall;
  public updateToLatestLedger(
    request: get_with_proof_pb.UpdateToLatestLedgerRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: get_with_proof_pb.UpdateToLatestLedgerResponse) => void,
  ): grpc.ClientUnaryCall;
  public updateToLatestLedger(
    request: get_with_proof_pb.UpdateToLatestLedgerRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: get_with_proof_pb.UpdateToLatestLedgerResponse) => void,
  ): grpc.ClientUnaryCall;
}
