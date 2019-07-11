// package: types
// file: account_state_blob.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as proof_pb from "./proof_pb";

export class AccountStateBlob extends jspb.Message { 
    getBlob(): Uint8Array | string;
    getBlob_asU8(): Uint8Array;
    getBlob_asB64(): string;
    setBlob(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccountStateBlob.AsObject;
    static toObject(includeInstance: boolean, msg: AccountStateBlob): AccountStateBlob.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccountStateBlob, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccountStateBlob;
    static deserializeBinaryFromReader(message: AccountStateBlob, reader: jspb.BinaryReader): AccountStateBlob;
}

export namespace AccountStateBlob {
    export type AsObject = {
        blob: Uint8Array | string,
    }
}

export class AccountStateWithProof extends jspb.Message { 
    getVersion(): number;
    setVersion(value: number): void;


    hasBlob(): boolean;
    clearBlob(): void;
    getBlob(): AccountStateBlob | undefined;
    setBlob(value?: AccountStateBlob): void;


    hasProof(): boolean;
    clearProof(): void;
    getProof(): proof_pb.AccountStateProof | undefined;
    setProof(value?: proof_pb.AccountStateProof): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccountStateWithProof.AsObject;
    static toObject(includeInstance: boolean, msg: AccountStateWithProof): AccountStateWithProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccountStateWithProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccountStateWithProof;
    static deserializeBinaryFromReader(message: AccountStateWithProof, reader: jspb.BinaryReader): AccountStateWithProof;
}

export namespace AccountStateWithProof {
    export type AsObject = {
        version: number,
        blob?: AccountStateBlob.AsObject,
        proof?: proof_pb.AccountStateProof.AsObject,
    }
}
