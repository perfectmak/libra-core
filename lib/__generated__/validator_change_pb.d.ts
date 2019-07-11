// package: types
// file: validator_change.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as events_pb from "./events_pb";
import * as ledger_info_pb from "./ledger_info_pb";

export class ValidatorChangeEventWithProof extends jspb.Message { 

    hasLedgerInfoWithSigs(): boolean;
    clearLedgerInfoWithSigs(): void;
    getLedgerInfoWithSigs(): ledger_info_pb.LedgerInfoWithSignatures | undefined;
    setLedgerInfoWithSigs(value?: ledger_info_pb.LedgerInfoWithSignatures): void;


    hasEventWithProof(): boolean;
    clearEventWithProof(): void;
    getEventWithProof(): events_pb.EventWithProof | undefined;
    setEventWithProof(value?: events_pb.EventWithProof): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidatorChangeEventWithProof.AsObject;
    static toObject(includeInstance: boolean, msg: ValidatorChangeEventWithProof): ValidatorChangeEventWithProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidatorChangeEventWithProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidatorChangeEventWithProof;
    static deserializeBinaryFromReader(message: ValidatorChangeEventWithProof, reader: jspb.BinaryReader): ValidatorChangeEventWithProof;
}

export namespace ValidatorChangeEventWithProof {
    export type AsObject = {
        ledgerInfoWithSigs?: ledger_info_pb.LedgerInfoWithSignatures.AsObject,
        eventWithProof?: events_pb.EventWithProof.AsObject,
    }
}
