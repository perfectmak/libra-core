// package: types
// file: validator_set.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as validator_public_keys_pb from "./validator_public_keys_pb";

export class ValidatorSet extends jspb.Message { 
    clearValidatorPublicKeysList(): void;
    getValidatorPublicKeysList(): Array<validator_public_keys_pb.ValidatorPublicKeys>;
    setValidatorPublicKeysList(value: Array<validator_public_keys_pb.ValidatorPublicKeys>): void;
    addValidatorPublicKeys(value?: validator_public_keys_pb.ValidatorPublicKeys, index?: number): validator_public_keys_pb.ValidatorPublicKeys;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidatorSet.AsObject;
    static toObject(includeInstance: boolean, msg: ValidatorSet): ValidatorSet.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidatorSet, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidatorSet;
    static deserializeBinaryFromReader(message: ValidatorSet, reader: jspb.BinaryReader): ValidatorSet;
}

export namespace ValidatorSet {
    export type AsObject = {
        validatorPublicKeysList: Array<validator_public_keys_pb.ValidatorPublicKeys.AsObject>,
    }
}
