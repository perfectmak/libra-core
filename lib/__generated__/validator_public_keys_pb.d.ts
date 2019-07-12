// package: types
// file: validator_public_keys.proto

/* tslint:disable */

import * as jspb from 'google-protobuf';

export class ValidatorPublicKeys extends jspb.Message {
  getAccountAddress(): Uint8Array | string;
  getAccountAddress_asU8(): Uint8Array;
  getAccountAddress_asB64(): string;
  setAccountAddress(value: Uint8Array | string): void;

  getConsensusPublicKey(): Uint8Array | string;
  getConsensusPublicKey_asU8(): Uint8Array;
  getConsensusPublicKey_asB64(): string;
  setConsensusPublicKey(value: Uint8Array | string): void;

  getNetworkSigningPublicKey(): Uint8Array | string;
  getNetworkSigningPublicKey_asU8(): Uint8Array;
  getNetworkSigningPublicKey_asB64(): string;
  setNetworkSigningPublicKey(value: Uint8Array | string): void;

  getNetworkIdentityPublicKey(): Uint8Array | string;
  getNetworkIdentityPublicKey_asU8(): Uint8Array;
  getNetworkIdentityPublicKey_asB64(): string;
  setNetworkIdentityPublicKey(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidatorPublicKeys.AsObject;
  static toObject(includeInstance: boolean, msg: ValidatorPublicKeys): ValidatorPublicKeys.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: ValidatorPublicKeys, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidatorPublicKeys;
  static deserializeBinaryFromReader(message: ValidatorPublicKeys, reader: jspb.BinaryReader): ValidatorPublicKeys;
}

export namespace ValidatorPublicKeys {
  export type AsObject = {
    accountAddress: Uint8Array | string;
    consensusPublicKey: Uint8Array | string;
    networkSigningPublicKey: Uint8Array | string;
    networkIdentityPublicKey: Uint8Array | string;
  };
}
