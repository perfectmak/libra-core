// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) The Libra Core Contributors
// SPDX-License-Identifier: Apache-2.0
//
'use strict';
var grpc = require('grpc');
var admission_control_pb = require('./admission_control_pb.js');
var get_with_proof_pb = require('./get_with_proof_pb.js');
var mempool_status_pb = require('./mempool_status_pb.js');
var transaction_pb = require('./transaction_pb.js');
var vm_errors_pb = require('./vm_errors_pb.js');

function serialize_admission_control_SubmitTransactionRequest(arg) {
  if (!(arg instanceof admission_control_pb.SubmitTransactionRequest)) {
    throw new Error('Expected argument of type admission_control.SubmitTransactionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_admission_control_SubmitTransactionRequest(buffer_arg) {
  return admission_control_pb.SubmitTransactionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_admission_control_SubmitTransactionResponse(arg) {
  if (!(arg instanceof admission_control_pb.SubmitTransactionResponse)) {
    throw new Error('Expected argument of type admission_control.SubmitTransactionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_admission_control_SubmitTransactionResponse(buffer_arg) {
  return admission_control_pb.SubmitTransactionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_types_UpdateToLatestLedgerRequest(arg) {
  if (!(arg instanceof get_with_proof_pb.UpdateToLatestLedgerRequest)) {
    throw new Error('Expected argument of type types.UpdateToLatestLedgerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_types_UpdateToLatestLedgerRequest(buffer_arg) {
  return get_with_proof_pb.UpdateToLatestLedgerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_types_UpdateToLatestLedgerResponse(arg) {
  if (!(arg instanceof get_with_proof_pb.UpdateToLatestLedgerResponse)) {
    throw new Error('Expected argument of type types.UpdateToLatestLedgerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_types_UpdateToLatestLedgerResponse(buffer_arg) {
  return get_with_proof_pb.UpdateToLatestLedgerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// -----------------------------------------------------------------------------
// ---------------- Service definition
// -----------------------------------------------------------------------------
var AdmissionControlService = exports.AdmissionControlService = {
  // Public API to submit transaction to a validator.
  submitTransaction: {
    path: '/admission_control.AdmissionControl/SubmitTransaction',
    requestStream: false,
    responseStream: false,
    requestType: admission_control_pb.SubmitTransactionRequest,
    responseType: admission_control_pb.SubmitTransactionResponse,
    requestSerialize: serialize_admission_control_SubmitTransactionRequest,
    requestDeserialize: deserialize_admission_control_SubmitTransactionRequest,
    responseSerialize: serialize_admission_control_SubmitTransactionResponse,
    responseDeserialize: deserialize_admission_control_SubmitTransactionResponse,
  },
  // This API is used to update the client to the latest ledger version and
  // optionally also request 1..n other pieces of data.  This allows for batch
  // queries.  All queries return proofs that a client should check to validate
  // the data. Note that if a client only wishes to update to the latest
  // LedgerInfo and receive the proof of this latest version, they can simply
  // omit the requested_items (or pass an empty list)
  updateToLatestLedger: {
    path: '/admission_control.AdmissionControl/UpdateToLatestLedger',
    requestStream: false,
    responseStream: false,
    requestType: get_with_proof_pb.UpdateToLatestLedgerRequest,
    responseType: get_with_proof_pb.UpdateToLatestLedgerResponse,
    requestSerialize: serialize_types_UpdateToLatestLedgerRequest,
    requestDeserialize: deserialize_types_UpdateToLatestLedgerRequest,
    responseSerialize: serialize_types_UpdateToLatestLedgerResponse,
    responseDeserialize: deserialize_types_UpdateToLatestLedgerResponse,
  },
};

exports.AdmissionControlClient = grpc.makeGenericClientConstructor(AdmissionControlService);
