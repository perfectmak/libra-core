// package: admission_control
// file: admission_control.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as get_with_proof_pb from "./get_with_proof_pb";
import * as transaction_pb from "./transaction_pb";
import * as proof_pb from "./proof_pb";
import * as ledger_info_pb from "./ledger_info_pb";
import * as vm_errors_pb from "./vm_errors_pb";
import * as mempool_status_pb from "./mempool_status_pb";

export class SubmitTransactionRequest extends jspb.Message { 

    hasSignedTxn(): boolean;
    clearSignedTxn(): void;
    getSignedTxn(): transaction_pb.SignedTransaction | undefined;
    setSignedTxn(value?: transaction_pb.SignedTransaction): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubmitTransactionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubmitTransactionRequest): SubmitTransactionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubmitTransactionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubmitTransactionRequest;
    static deserializeBinaryFromReader(message: SubmitTransactionRequest, reader: jspb.BinaryReader): SubmitTransactionRequest;
}

export namespace SubmitTransactionRequest {
    export type AsObject = {
        signedTxn?: transaction_pb.SignedTransaction.AsObject,
    }
}

export class SubmitTransactionResponse extends jspb.Message { 

    hasVmStatus(): boolean;
    clearVmStatus(): void;
    getVmStatus(): vm_errors_pb.VMStatus | undefined;
    setVmStatus(value?: vm_errors_pb.VMStatus): void;


    hasAcStatus(): boolean;
    clearAcStatus(): void;
    getAcStatus(): AdmissionControlStatus;
    setAcStatus(value: AdmissionControlStatus): void;


    hasMempoolStatus(): boolean;
    clearMempoolStatus(): void;
    getMempoolStatus(): mempool_status_pb.MempoolAddTransactionStatus;
    setMempoolStatus(value: mempool_status_pb.MempoolAddTransactionStatus): void;

    getValidatorId(): Uint8Array | string;
    getValidatorId_asU8(): Uint8Array;
    getValidatorId_asB64(): string;
    setValidatorId(value: Uint8Array | string): void;


    getStatusCase(): SubmitTransactionResponse.StatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubmitTransactionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SubmitTransactionResponse): SubmitTransactionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubmitTransactionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubmitTransactionResponse;
    static deserializeBinaryFromReader(message: SubmitTransactionResponse, reader: jspb.BinaryReader): SubmitTransactionResponse;
}

export namespace SubmitTransactionResponse {
    export type AsObject = {
        vmStatus?: vm_errors_pb.VMStatus.AsObject,
        acStatus: AdmissionControlStatus,
        mempoolStatus: mempool_status_pb.MempoolAddTransactionStatus,
        validatorId: Uint8Array | string,
    }

    export enum StatusCase {
        STATUS_NOT_SET = 0,
    
    VM_STATUS = 1,

    AC_STATUS = 2,

    MEMPOOL_STATUS = 3,

    }

}

export enum AdmissionControlStatus {
    ACCEPTED = 0,
    BLACKLISTED = 1,
    REJECTED = 2,
}
