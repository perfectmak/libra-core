export class LibraVMStatusError {
  public readonly validationStatusError?: LibraValidationStatusError;
  public readonly verificationStatusErrors?: LibraVerificationStatusError[];
  public readonly invariantViolationError?: LibraInvariantViolationError;
  public readonly deserializationError?: LibraDeserializationError;
  public readonly executionError?: LibraExecutionError;
  public readonly errorType: LibraErrorType;

  constructor(
    errorType: LibraErrorType | number,
    validationStatus?: LibraValidationStatusError,
    verificationStatusList?: LibraVerificationStatusError[],
    invariantViolation?: LibraInvariantViolationError,
    deserializationError?: LibraDeserializationError,
    executionError?: LibraExecutionError,
  ) {
    this.errorType = errorType;
    this.validationStatusError = validationStatus;
    this.verificationStatusErrors = verificationStatusList;
    this.invariantViolationError = invariantViolation;
    this.deserializationError = deserializationError;
    this.executionError = executionError;
  }
}

export enum LibraErrorType {
  ERRORTYPE_NOT_SET = 0,
  VALIDATION = 1,
  VERIFICATION = 2,
  INVARIANT_VIOLATION = 3,
  DESERIALIZATION = 4,
  EXECUTION = 5,
}

export interface LibraValidationStatusError {
  code: LibraValidationStatusCode;
  message: string;
}

// copy of pb.VMValidationStatusCode
export enum LibraValidationStatusCode {
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

export class LibraVerificationStatusError {
  public readonly status: LibraVerificationStatusKind;
  public readonly moduleIndex: number;
  public readonly error: LibraVerificationError;
  public readonly message: string;

  constructor(
    status: LibraVerificationStatusKind,
    moduleIndex: number,
    error: LibraVerificationError,
    message: string,
  ) {
    this.status = status;
    this.moduleIndex = moduleIndex;
    this.error = error;
    this.message = message;
  }
}

export enum LibraVerificationStatusKind {
  SCRIPT = 0,
  MODULE = 1,
}

export enum LibraVerificationError {
  UNKNOWNVERIFICATIONERROR = 0,
  INDEXOUTOFBOUNDS = 1,
  RANGEOUTOFBOUNDS = 2,
  INVALIDSIGNATURETOKEN = 3,
  INVALIDFIELDDEFREFERENCE = 4,
  RECURSIVESTRUCTDEFINITION = 5,
  INVALIDRESOURCEFIELD = 6,
  INVALIDFALLTHROUGH = 7,
  JOINFAILURE = 8,
  NEGATIVESTACKSIZEWITHINBLOCK = 9,
  UNBALANCEDSTACK = 10,
  INVALIDMAINFUNCTIONSIGNATURE = 11,
  DUPLICATEELEMENT = 12,
  INVALIDMODULEHANDLE = 13,
  UNIMPLEMENTEDHANDLE = 14,
  INCONSISTENTFIELDS = 15,
  UNUSEDFIELDS = 16,
  LOOKUPFAILED = 17,
  VISIBILITYMISMATCH = 18,
  TYPERESOLUTIONFAILURE = 19,
  TYPEMISMATCH = 20,
  MISSINGDEPENDENCY = 21,
  POPREFERENCEERROR = 22,
  POPRESOURCEERROR = 23,
  RELEASEREFTYPEMISMATCHERROR = 24,
  BRTYPEMISMATCHERROR = 25,
  ASSERTTYPEMISMATCHERROR = 26,
  STLOCTYPEMISMATCHERROR = 27,
  STLOCUNSAFETODESTROYERROR = 28,
  RETUNSAFETODESTROYERROR = 29,
  RETTYPEMISMATCHERROR = 30,
  FREEZEREFTYPEMISMATCHERROR = 31,
  FREEZEREFEXISTSMUTABLEBORROWERROR = 32,
  BORROWFIELDTYPEMISMATCHERROR = 33,
  BORROWFIELDBADFIELDERROR = 34,
  BORROWFIELDEXISTSMUTABLEBORROWERROR = 35,
  COPYLOCUNAVAILABLEERROR = 36,
  COPYLOCRESOURCEERROR = 37,
  COPYLOCEXISTSBORROWERROR = 38,
  MOVELOCUNAVAILABLEERROR = 39,
  MOVELOCEXISTSBORROWERROR = 40,
  BORROWLOCREFERENCEERROR = 41,
  BORROWLOCUNAVAILABLEERROR = 42,
  BORROWLOCEXISTSBORROWERROR = 43,
  CALLTYPEMISMATCHERROR = 44,
  CALLBORROWEDMUTABLEREFERENCEERROR = 45,
  PACKTYPEMISMATCHERROR = 46,
  UNPACKTYPEMISMATCHERROR = 47,
  READREFTYPEMISMATCHERROR = 48,
  READREFRESOURCEERROR = 49,
  READREFEXISTSMUTABLEBORROWERROR = 50,
  WRITEREFTYPEMISMATCHERROR = 51,
  WRITEREFRESOURCEERROR = 52,
  WRITEREFEXISTSBORROWERROR = 53,
  WRITEREFNOMUTABLEREFERENCEERROR = 54,
  INTEGEROPTYPEMISMATCHERROR = 55,
  BOOLEANOPTYPEMISMATCHERROR = 56,
  EQUALITYOPTYPEMISMATCHERROR = 57,
  EXISTSRESOURCETYPEMISMATCHERROR = 58,
  BORROWGLOBALTYPEMISMATCHERROR = 59,
  BORROWGLOBALNORESOURCEERROR = 60,
  MOVEFROMTYPEMISMATCHERROR = 61,
  MOVEFROMNORESOURCEERROR = 62,
  MOVETOSENDERTYPEMISMATCHERROR = 63,
  MOVETOSENDERNORESOURCEERROR = 64,
  CREATEACCOUNTTYPEMISMATCHERROR = 65,
  MODULEADDRESSDOESNOTMATCHSENDER = 66,
  NOMODULEHANDLES = 67,
}

export enum LibraInvariantViolationError {
  UNKNOWNINVARIANTVIOLATIONERROR = 0,
  OUTOFBOUNDSINDEX = 1,
  OUTOFBOUNDSRANGE = 2,
  EMPTYVALUESTACK = 3,
  EMPTYCALLSTACK = 4,
  PCOVERFLOW = 5,
  LINKERERROR = 6,
  LOCALREFERENCEERROR = 7,
  STORAGEERROR = 8,
}

// copy of pb.BinaryError
export enum LibraDeserializationError {
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

// copy of pb.ExecutionStatus
export interface LibraExecutionError {
  errorType: LibraExecutionErrorType;
}

export enum LibraExecutionErrorType {
  EXECUTIONSTATUS_NOT_SET = 0,
  RUNTIME_STATUS = 1,
  ASSERTION_FAILURE = 2,
  ARITHMETIC_ERROR = 3,
  REFERENCE_ERROR = 4,
}
