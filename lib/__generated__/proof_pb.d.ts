// package: types
// file: proof.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as transaction_info_pb from "./transaction_info_pb";

export class AccumulatorProof extends jspb.Message { 
    getBitmap(): string;
    setBitmap(value: string): void;

    clearNonDefaultSiblingsList(): void;
    getNonDefaultSiblingsList(): Array<Uint8Array | string>;
    getNonDefaultSiblingsList_asU8(): Array<Uint8Array>;
    getNonDefaultSiblingsList_asB64(): Array<string>;
    setNonDefaultSiblingsList(value: Array<Uint8Array | string>): void;
    addNonDefaultSiblings(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccumulatorProof.AsObject;
    static toObject(includeInstance: boolean, msg: AccumulatorProof): AccumulatorProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccumulatorProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccumulatorProof;
    static deserializeBinaryFromReader(message: AccumulatorProof, reader: jspb.BinaryReader): AccumulatorProof;
}

export namespace AccumulatorProof {
    export type AsObject = {
        bitmap: string,
        nonDefaultSiblingsList: Array<Uint8Array | string>,
    }
}

export class SparseMerkleProof extends jspb.Message { 
    getLeaf(): Uint8Array | string;
    getLeaf_asU8(): Uint8Array;
    getLeaf_asB64(): string;
    setLeaf(value: Uint8Array | string): void;

    getBitmap(): Uint8Array | string;
    getBitmap_asU8(): Uint8Array;
    getBitmap_asB64(): string;
    setBitmap(value: Uint8Array | string): void;

    clearNonDefaultSiblingsList(): void;
    getNonDefaultSiblingsList(): Array<Uint8Array | string>;
    getNonDefaultSiblingsList_asU8(): Array<Uint8Array>;
    getNonDefaultSiblingsList_asB64(): Array<string>;
    setNonDefaultSiblingsList(value: Array<Uint8Array | string>): void;
    addNonDefaultSiblings(value: Uint8Array | string, index?: number): Uint8Array | string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SparseMerkleProof.AsObject;
    static toObject(includeInstance: boolean, msg: SparseMerkleProof): SparseMerkleProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SparseMerkleProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SparseMerkleProof;
    static deserializeBinaryFromReader(message: SparseMerkleProof, reader: jspb.BinaryReader): SparseMerkleProof;
}

export namespace SparseMerkleProof {
    export type AsObject = {
        leaf: Uint8Array | string,
        bitmap: Uint8Array | string,
        nonDefaultSiblingsList: Array<Uint8Array | string>,
    }
}

export class SignedTransactionProof extends jspb.Message { 

    hasLedgerInfoToTransactionInfoProof(): boolean;
    clearLedgerInfoToTransactionInfoProof(): void;
    getLedgerInfoToTransactionInfoProof(): AccumulatorProof | undefined;
    setLedgerInfoToTransactionInfoProof(value?: AccumulatorProof): void;


    hasTransactionInfo(): boolean;
    clearTransactionInfo(): void;
    getTransactionInfo(): transaction_info_pb.TransactionInfo | undefined;
    setTransactionInfo(value?: transaction_info_pb.TransactionInfo): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SignedTransactionProof.AsObject;
    static toObject(includeInstance: boolean, msg: SignedTransactionProof): SignedTransactionProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SignedTransactionProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SignedTransactionProof;
    static deserializeBinaryFromReader(message: SignedTransactionProof, reader: jspb.BinaryReader): SignedTransactionProof;
}

export namespace SignedTransactionProof {
    export type AsObject = {
        ledgerInfoToTransactionInfoProof?: AccumulatorProof.AsObject,
        transactionInfo?: transaction_info_pb.TransactionInfo.AsObject,
    }
}

export class AccountStateProof extends jspb.Message { 

    hasLedgerInfoToTransactionInfoProof(): boolean;
    clearLedgerInfoToTransactionInfoProof(): void;
    getLedgerInfoToTransactionInfoProof(): AccumulatorProof | undefined;
    setLedgerInfoToTransactionInfoProof(value?: AccumulatorProof): void;


    hasTransactionInfo(): boolean;
    clearTransactionInfo(): void;
    getTransactionInfo(): transaction_info_pb.TransactionInfo | undefined;
    setTransactionInfo(value?: transaction_info_pb.TransactionInfo): void;


    hasTransactionInfoToAccountProof(): boolean;
    clearTransactionInfoToAccountProof(): void;
    getTransactionInfoToAccountProof(): SparseMerkleProof | undefined;
    setTransactionInfoToAccountProof(value?: SparseMerkleProof): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccountStateProof.AsObject;
    static toObject(includeInstance: boolean, msg: AccountStateProof): AccountStateProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccountStateProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccountStateProof;
    static deserializeBinaryFromReader(message: AccountStateProof, reader: jspb.BinaryReader): AccountStateProof;
}

export namespace AccountStateProof {
    export type AsObject = {
        ledgerInfoToTransactionInfoProof?: AccumulatorProof.AsObject,
        transactionInfo?: transaction_info_pb.TransactionInfo.AsObject,
        transactionInfoToAccountProof?: SparseMerkleProof.AsObject,
    }
}

export class EventProof extends jspb.Message { 

    hasLedgerInfoToTransactionInfoProof(): boolean;
    clearLedgerInfoToTransactionInfoProof(): void;
    getLedgerInfoToTransactionInfoProof(): AccumulatorProof | undefined;
    setLedgerInfoToTransactionInfoProof(value?: AccumulatorProof): void;


    hasTransactionInfo(): boolean;
    clearTransactionInfo(): void;
    getTransactionInfo(): transaction_info_pb.TransactionInfo | undefined;
    setTransactionInfo(value?: transaction_info_pb.TransactionInfo): void;


    hasTransactionInfoToEventProof(): boolean;
    clearTransactionInfoToEventProof(): void;
    getTransactionInfoToEventProof(): AccumulatorProof | undefined;
    setTransactionInfoToEventProof(value?: AccumulatorProof): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventProof.AsObject;
    static toObject(includeInstance: boolean, msg: EventProof): EventProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventProof;
    static deserializeBinaryFromReader(message: EventProof, reader: jspb.BinaryReader): EventProof;
}

export namespace EventProof {
    export type AsObject = {
        ledgerInfoToTransactionInfoProof?: AccumulatorProof.AsObject,
        transactionInfo?: transaction_info_pb.TransactionInfo.AsObject,
        transactionInfoToEventProof?: AccumulatorProof.AsObject,
    }
}
