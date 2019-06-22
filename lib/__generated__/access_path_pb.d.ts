// package: types
// file: access_path.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class AccessPath extends jspb.Message { 
    getAddress(): Uint8Array | string;
    getAddress_asU8(): Uint8Array;
    getAddress_asB64(): string;
    setAddress(value: Uint8Array | string): void;

    getPath(): Uint8Array | string;
    getPath_asU8(): Uint8Array;
    getPath_asB64(): string;
    setPath(value: Uint8Array | string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AccessPath.AsObject;
    static toObject(includeInstance: boolean, msg: AccessPath): AccessPath.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AccessPath, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AccessPath;
    static deserializeBinaryFromReader(message: AccessPath, reader: jspb.BinaryReader): AccessPath;
}

export namespace AccessPath {
    export type AsObject = {
        address: Uint8Array | string,
        path: Uint8Array | string,
    }
}
