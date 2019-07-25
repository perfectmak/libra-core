// package: mempool
// file: mempool_status.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class MempoolAddTransactionStatus extends jspb.Message { 
    getCode(): MempoolAddTransactionStatusCode;
    setCode(value: MempoolAddTransactionStatusCode): void;

    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MempoolAddTransactionStatus.AsObject;
    static toObject(includeInstance: boolean, msg: MempoolAddTransactionStatus): MempoolAddTransactionStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MempoolAddTransactionStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MempoolAddTransactionStatus;
    static deserializeBinaryFromReader(message: MempoolAddTransactionStatus, reader: jspb.BinaryReader): MempoolAddTransactionStatus;
}

export namespace MempoolAddTransactionStatus {
    export type AsObject = {
        code: MempoolAddTransactionStatusCode,
        message: string,
    }
}

export enum MempoolAddTransactionStatusCode {
    VALID = 0,
    INSUFFICIENTBALANCE = 1,
    INVALIDSEQNUMBER = 2,
    MEMPOOLISFULL = 3,
    TOOMANYTRANSACTIONS = 4,
    INVALIDUPDATE = 5,
}
