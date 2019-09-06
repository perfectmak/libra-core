// package: types
// file: vm_errors.proto

/* tslint:disable */

import * as jspb from "google-protobuf";
import * as language_storage_pb from "./language_storage_pb";

export class VMValidationStatus extends jspb.Message { 
    getCode(): VMValidationStatusCode;
    setCode(value: VMValidationStatusCode): void;

    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VMValidationStatus.AsObject;
    static toObject(includeInstance: boolean, msg: VMValidationStatus): VMValidationStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VMValidationStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VMValidationStatus;
    static deserializeBinaryFromReader(message: VMValidationStatus, reader: jspb.BinaryReader): VMValidationStatus;
}

export namespace VMValidationStatus {
    export type AsObject = {
        code: VMValidationStatusCode,
        message: string,
    }
}

export class VMVerificationStatusList extends jspb.Message { 
    clearStatusListList(): void;
    getStatusListList(): Array<VMVerificationStatus>;
    setStatusListList(value: Array<VMVerificationStatus>): void;
    addStatusList(value?: VMVerificationStatus, index?: number): VMVerificationStatus;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VMVerificationStatusList.AsObject;
    static toObject(includeInstance: boolean, msg: VMVerificationStatusList): VMVerificationStatusList.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VMVerificationStatusList, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VMVerificationStatusList;
    static deserializeBinaryFromReader(message: VMVerificationStatusList, reader: jspb.BinaryReader): VMVerificationStatusList;
}

export namespace VMVerificationStatusList {
    export type AsObject = {
        statusListList: Array<VMVerificationStatus.AsObject>,
    }
}

export class VMVerificationStatus extends jspb.Message { 
    getStatusKind(): VMVerificationStatus.StatusKind;
    setStatusKind(value: VMVerificationStatus.StatusKind): void;

    getModuleIdx(): number;
    setModuleIdx(value: number): void;

    getErrorKind(): VMVerificationErrorKind;
    setErrorKind(value: VMVerificationErrorKind): void;

    getMessage(): string;
    setMessage(value: string): void;


    hasDependencyId(): boolean;
    clearDependencyId(): void;
    getDependencyId(): language_storage_pb.ModuleId | undefined;
    setDependencyId(value?: language_storage_pb.ModuleId): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VMVerificationStatus.AsObject;
    static toObject(includeInstance: boolean, msg: VMVerificationStatus): VMVerificationStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VMVerificationStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VMVerificationStatus;
    static deserializeBinaryFromReader(message: VMVerificationStatus, reader: jspb.BinaryReader): VMVerificationStatus;
}

export namespace VMVerificationStatus {
    export type AsObject = {
        statusKind: VMVerificationStatus.StatusKind,
        moduleIdx: number,
        errorKind: VMVerificationErrorKind,
        message: string,
        dependencyId?: language_storage_pb.ModuleId.AsObject,
    }

    export enum StatusKind {
    SCRIPT = 0,
    MODULE = 1,
    DEPENDENCY = 2,
    }

}

export class Aborted extends jspb.Message { 
    getAbortedErrorCode(): number;
    setAbortedErrorCode(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Aborted.AsObject;
    static toObject(includeInstance: boolean, msg: Aborted): Aborted.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Aborted, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Aborted;
    static deserializeBinaryFromReader(message: Aborted, reader: jspb.BinaryReader): Aborted;
}

export namespace Aborted {
    export type AsObject = {
        abortedErrorCode: number,
    }
}

export class ArithmeticError extends jspb.Message { 
    getErrorCode(): ArithmeticError.ArithmeticErrorType;
    setErrorCode(value: ArithmeticError.ArithmeticErrorType): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ArithmeticError.AsObject;
    static toObject(includeInstance: boolean, msg: ArithmeticError): ArithmeticError.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ArithmeticError, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ArithmeticError;
    static deserializeBinaryFromReader(message: ArithmeticError, reader: jspb.BinaryReader): ArithmeticError;
}

export namespace ArithmeticError {
    export type AsObject = {
        errorCode: ArithmeticError.ArithmeticErrorType,
    }

    export enum ArithmeticErrorType {
    UNKNOWNARITHMETICERROR = 0,
    UNDERFLOW = 1,
    OVERFLOW = 2,
    DIVISIONBYZERO = 3,
    }

}

export class DynamicReferenceError extends jspb.Message { 
    getErrorCode(): DynamicReferenceError.DynamicReferenceErrorType;
    setErrorCode(value: DynamicReferenceError.DynamicReferenceErrorType): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DynamicReferenceError.AsObject;
    static toObject(includeInstance: boolean, msg: DynamicReferenceError): DynamicReferenceError.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DynamicReferenceError, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DynamicReferenceError;
    static deserializeBinaryFromReader(message: DynamicReferenceError, reader: jspb.BinaryReader): DynamicReferenceError;
}

export namespace DynamicReferenceError {
    export type AsObject = {
        errorCode: DynamicReferenceError.DynamicReferenceErrorType,
    }

    export enum DynamicReferenceErrorType {
    UNKNOWNDYNAMICREFERENCEERROR = 0,
    MOVEOFBORROWEDRESOURCE = 1,
    GLOBALREFALREADYRELEASED = 2,
    MISSINGRELEASEREF = 3,
    GLOBALALREADYBORROWED = 4,
    }

}

export class ExecutionStatus extends jspb.Message { 

    hasRuntimeStatus(): boolean;
    clearRuntimeStatus(): void;
    getRuntimeStatus(): RuntimeStatus;
    setRuntimeStatus(value: RuntimeStatus): void;


    hasAborted(): boolean;
    clearAborted(): void;
    getAborted(): Aborted | undefined;
    setAborted(value?: Aborted): void;


    hasArithmeticError(): boolean;
    clearArithmeticError(): void;
    getArithmeticError(): ArithmeticError | undefined;
    setArithmeticError(value?: ArithmeticError): void;


    hasReferenceError(): boolean;
    clearReferenceError(): void;
    getReferenceError(): DynamicReferenceError | undefined;
    setReferenceError(value?: DynamicReferenceError): void;


    getExecutionStatusCase(): ExecutionStatus.ExecutionStatusCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecutionStatus.AsObject;
    static toObject(includeInstance: boolean, msg: ExecutionStatus): ExecutionStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecutionStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecutionStatus;
    static deserializeBinaryFromReader(message: ExecutionStatus, reader: jspb.BinaryReader): ExecutionStatus;
}

export namespace ExecutionStatus {
    export type AsObject = {
        runtimeStatus: RuntimeStatus,
        aborted?: Aborted.AsObject,
        arithmeticError?: ArithmeticError.AsObject,
        referenceError?: DynamicReferenceError.AsObject,
    }

    export enum ExecutionStatusCase {
        EXECUTIONSTATUS_NOT_SET = 0,
    
    RUNTIME_STATUS = 1,

    ABORTED = 2,

    ARITHMETIC_ERROR = 3,

    REFERENCE_ERROR = 4,

    }

}

export class VMStatus extends jspb.Message { 

    hasValidation(): boolean;
    clearValidation(): void;
    getValidation(): VMValidationStatus | undefined;
    setValidation(value?: VMValidationStatus): void;


    hasVerification(): boolean;
    clearVerification(): void;
    getVerification(): VMVerificationStatusList | undefined;
    setVerification(value?: VMVerificationStatusList): void;


    hasInvariantViolation(): boolean;
    clearInvariantViolation(): void;
    getInvariantViolation(): VMInvariantViolationError;
    setInvariantViolation(value: VMInvariantViolationError): void;


    hasDeserialization(): boolean;
    clearDeserialization(): void;
    getDeserialization(): BinaryError;
    setDeserialization(value: BinaryError): void;


    hasExecution(): boolean;
    clearExecution(): void;
    getExecution(): ExecutionStatus | undefined;
    setExecution(value?: ExecutionStatus): void;


    getErrorTypeCase(): VMStatus.ErrorTypeCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VMStatus.AsObject;
    static toObject(includeInstance: boolean, msg: VMStatus): VMStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VMStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VMStatus;
    static deserializeBinaryFromReader(message: VMStatus, reader: jspb.BinaryReader): VMStatus;
}

export namespace VMStatus {
    export type AsObject = {
        validation?: VMValidationStatus.AsObject,
        verification?: VMVerificationStatusList.AsObject,
        invariantViolation: VMInvariantViolationError,
        deserialization: BinaryError,
        execution?: ExecutionStatus.AsObject,
    }

    export enum ErrorTypeCase {
        ERRORTYPE_NOT_SET = 0,
    
    VALIDATION = 1,

    VERIFICATION = 2,

    INVARIANT_VIOLATION = 3,

    DESERIALIZATION = 4,

    EXECUTION = 5,

    }

}

export enum VMValidationStatusCode {
    UNKNOWNVALIDATIONSTATUS = 0,
    INVALIDSIGNATURE = 1,
    INVALIDAUTHKEY = 2,
    SEQUENCENUMBERTOOOLD = 3,
    SEQUENCENUMBERTOONEW = 4,
    INSUFFICIENTBALANCEFORTRANSACTIONFEE = 5,
    TRANSACTIONEXPIRED = 6,
    SENDINGACCOUNTDOESNOTEXIST = 7,
    REJECTEDWRITESET = 8,
    INVALIDWRITESET = 9,
    EXCEEDEDMAXTRANSACTIONSIZE = 10,
    UNKNOWNSCRIPT = 11,
    UNKNOWNMODULE = 12,
    MAXGASUNITSEXCEEDSMAXGASUNITSBOUND = 13,
    MAXGASUNITSBELOWMINTRANSACTIONGASUNITS = 14,
    GASUNITPRICEBELOWMINBOUND = 15,
    GASUNITPRICEABOVEMAXBOUND = 16,
}

export enum VMVerificationErrorKind {
    UNKNOWNVERIFICATIONERROR = 0,
    INDEXOUTOFBOUNDS = 1,
    CODEUNITINDEXOUTOFBOUNDS = 2,
    RANGEOUTOFBOUNDS = 3,
    INVALIDSIGNATURETOKEN = 4,
    INVALIDFIELDDEFREFERENCE = 5,
    RECURSIVESTRUCTDEFINITION = 6,
    INVALIDRESOURCEFIELD = 7,
    INVALIDFALLTHROUGH = 8,
    JOINFAILURE = 9,
    NEGATIVESTACKSIZEWITHINBLOCK = 10,
    UNBALANCEDSTACK = 11,
    INVALIDMAINFUNCTIONSIGNATURE = 12,
    DUPLICATEELEMENT = 13,
    INVALIDMODULEHANDLE = 14,
    UNIMPLEMENTEDHANDLE = 15,
    INCONSISTENTFIELDS = 16,
    UNUSEDFIELDS = 17,
    LOOKUPFAILED = 18,
    VISIBILITYMISMATCH = 19,
    TYPERESOLUTIONFAILURE = 20,
    TYPEMISMATCH = 21,
    MISSINGDEPENDENCY = 22,
    POPREFERENCEERROR = 23,
    POPRESOURCEERROR = 24,
    RELEASEREFTYPEMISMATCHERROR = 25,
    BRTYPEMISMATCHERROR = 26,
    ABORTTYPEMISMATCHERROR = 27,
    STLOCTYPEMISMATCHERROR = 28,
    STLOCUNSAFETODESTROYERROR = 29,
    RETUNSAFETODESTROYERROR = 30,
    RETTYPEMISMATCHERROR = 31,
    FREEZEREFTYPEMISMATCHERROR = 32,
    FREEZEREFEXISTSMUTABLEBORROWERROR = 33,
    BORROWFIELDTYPEMISMATCHERROR = 34,
    BORROWFIELDBADFIELDERROR = 35,
    BORROWFIELDEXISTSMUTABLEBORROWERROR = 36,
    COPYLOCUNAVAILABLEERROR = 37,
    COPYLOCRESOURCEERROR = 38,
    COPYLOCEXISTSBORROWERROR = 39,
    MOVELOCUNAVAILABLEERROR = 40,
    MOVELOCEXISTSBORROWERROR = 41,
    BORROWLOCREFERENCEERROR = 42,
    BORROWLOCUNAVAILABLEERROR = 43,
    BORROWLOCEXISTSBORROWERROR = 44,
    CALLTYPEMISMATCHERROR = 45,
    CALLBORROWEDMUTABLEREFERENCEERROR = 46,
    PACKTYPEMISMATCHERROR = 47,
    UNPACKTYPEMISMATCHERROR = 48,
    READREFTYPEMISMATCHERROR = 49,
    READREFRESOURCEERROR = 50,
    READREFEXISTSMUTABLEBORROWERROR = 51,
    WRITEREFTYPEMISMATCHERROR = 52,
    WRITEREFRESOURCEERROR = 53,
    WRITEREFEXISTSBORROWERROR = 54,
    WRITEREFNOMUTABLEREFERENCEERROR = 55,
    INTEGEROPTYPEMISMATCHERROR = 56,
    BOOLEANOPTYPEMISMATCHERROR = 57,
    EQUALITYOPTYPEMISMATCHERROR = 58,
    EXISTSRESOURCETYPEMISMATCHERROR = 59,
    EXISTSNORESOURCEERROR = 60,
    BORROWGLOBALTYPEMISMATCHERROR = 61,
    BORROWGLOBALNORESOURCEERROR = 62,
    MOVEFROMTYPEMISMATCHERROR = 63,
    MOVEFROMNORESOURCEERROR = 64,
    MOVETOSENDERTYPEMISMATCHERROR = 65,
    MOVETOSENDERNORESOURCEERROR = 66,
    CREATEACCOUNTTYPEMISMATCHERROR = 67,
    GLOBALREFERENCEERROR = 68,
    MODULEADDRESSDOESNOTMATCHSENDER = 69,
    NOMODULEHANDLES = 70,
    MISSINGACQUIRESRESOURCEANNOTATIONERROR = 71,
    EXTRANEOUSACQUIRESRESOURCEANNOTATIONERROR = 72,
    DUPLICATEACQUIRESRESOURCEANNOTATIONERROR = 73,
    INVALIDACQUIRESRESOURCEANNOTATIONERROR = 74,
}

export enum VMInvariantViolationError {
    UNKNOWNINVARIANTVIOLATIONERROR = 0,
    OUTOFBOUNDSINDEX = 1,
    OUTOFBOUNDSRANGE = 2,
    EMPTYVALUESTACK = 3,
    EMPTYCALLSTACK = 4,
    PCOVERFLOW = 5,
    LINKERERROR = 6,
    LOCALREFERENCEERROR = 7,
    STORAGEERROR = 8,
    INTERNALTYPEERROR = 9,
    EVENTKEYMISMATCH = 10,
}

export enum BinaryError {
    UNKNOWNBINARYERROR = 0,
    MALFORMED = 1,
    BADMAGIC = 2,
    UNKNOWNVERSION = 3,
    UNKNOWNTABLETYPE = 4,
    UNKNOWNSIGNATURETYPE = 5,
    UNKNOWNSERIALIZEDTYPE = 6,
    UNKNOWNOPCODE = 7,
    BADHEADERTABLE = 8,
    UNEXPECTEDSIGNATURETYPE = 9,
    DUPLICATETABLE = 10,
}

export enum RuntimeStatus {
    UNKNOWNRUNTIMESTATUS = 0,
    EXECUTED = 1,
    OUTOFGAS = 2,
    RESOURCEDOESNOTEXIST = 3,
    RESOURCEALREADYEXISTS = 4,
    EVICTEDACCOUNTACCESS = 5,
    ACCOUNTADDRESSALREADYEXISTS = 6,
    TYPEERROR = 7,
    MISSINGDATA = 8,
    DATAFORMATERROR = 9,
    INVALIDDATA = 10,
    REMOTEDATAERROR = 11,
    CANNOTWRITEEXISTINGRESOURCE = 12,
    VALUESERIALIZATIONERROR = 13,
    VALUEDESERIALIZATIONERROR = 14,
    DUPLICATEMODULENAME = 15,
    EXECUTIONSTACKOVERFLOW = 16,
    CALLSTACKOVERFLOW = 17,
}
