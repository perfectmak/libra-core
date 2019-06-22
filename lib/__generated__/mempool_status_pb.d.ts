// package: mempool
// file: mempool_status.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export enum MempoolAddTransactionStatus {
    VALID = 0,
    INSUFFICIENTBALANCE = 1,
    INVALIDSEQNUMBER = 2,
    MEMPOOLISFULL = 3,
    TOOMANYTRANSACTIONS = 4,
    INVALIDUPDATE = 5,
}
