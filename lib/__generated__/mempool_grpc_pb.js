// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) The Libra Core Contributors
// SPDX-License-Identifier: Apache-2.0
//
'use strict';
var grpc = require('grpc');
var mempool_pb = require('./mempool_pb.js');
var transaction_pb = require('./transaction_pb.js');
var mempool_status_pb = require('./mempool_status_pb.js');

function serialize_mempool_AddTransactionWithValidationRequest(arg) {
  if (!(arg instanceof mempool_pb.AddTransactionWithValidationRequest)) {
    throw new Error('Expected argument of type mempool.AddTransactionWithValidationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mempool_AddTransactionWithValidationRequest(buffer_arg) {
  return mempool_pb.AddTransactionWithValidationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mempool_AddTransactionWithValidationResponse(arg) {
  if (!(arg instanceof mempool_pb.AddTransactionWithValidationResponse)) {
    throw new Error('Expected argument of type mempool.AddTransactionWithValidationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mempool_AddTransactionWithValidationResponse(buffer_arg) {
  return mempool_pb.AddTransactionWithValidationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mempool_CommitTransactionsRequest(arg) {
  if (!(arg instanceof mempool_pb.CommitTransactionsRequest)) {
    throw new Error('Expected argument of type mempool.CommitTransactionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mempool_CommitTransactionsRequest(buffer_arg) {
  return mempool_pb.CommitTransactionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mempool_CommitTransactionsResponse(arg) {
  if (!(arg instanceof mempool_pb.CommitTransactionsResponse)) {
    throw new Error('Expected argument of type mempool.CommitTransactionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mempool_CommitTransactionsResponse(buffer_arg) {
  return mempool_pb.CommitTransactionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mempool_GetBlockRequest(arg) {
  if (!(arg instanceof mempool_pb.GetBlockRequest)) {
    throw new Error('Expected argument of type mempool.GetBlockRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mempool_GetBlockRequest(buffer_arg) {
  return mempool_pb.GetBlockRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mempool_GetBlockResponse(arg) {
  if (!(arg instanceof mempool_pb.GetBlockResponse)) {
    throw new Error('Expected argument of type mempool.GetBlockResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mempool_GetBlockResponse(buffer_arg) {
  return mempool_pb.GetBlockResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mempool_HealthCheckRequest(arg) {
  if (!(arg instanceof mempool_pb.HealthCheckRequest)) {
    throw new Error('Expected argument of type mempool.HealthCheckRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mempool_HealthCheckRequest(buffer_arg) {
  return mempool_pb.HealthCheckRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_mempool_HealthCheckResponse(arg) {
  if (!(arg instanceof mempool_pb.HealthCheckResponse)) {
    throw new Error('Expected argument of type mempool.HealthCheckResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_mempool_HealthCheckResponse(buffer_arg) {
  return mempool_pb.HealthCheckResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// -----------------------------------------------------------------------------
// ---------------- Mempool Service Definition
// -----------------------------------------------------------------------------
var MempoolService = exports.MempoolService = {
  // Adds a new transaction to the mempool with validation against existing
  // transactions in the mempool.  Note that this function performs additional
  // validation that AC is unable to perform. (because AC knows only about a
  // single transaction, but mempool potentially knows about multiple pending
  // transactions)
  addTransactionWithValidation: {
    path: '/mempool.Mempool/AddTransactionWithValidation',
    requestStream: false,
    responseStream: false,
    requestType: mempool_pb.AddTransactionWithValidationRequest,
    responseType: mempool_pb.AddTransactionWithValidationResponse,
    requestSerialize: serialize_mempool_AddTransactionWithValidationRequest,
    requestDeserialize: deserialize_mempool_AddTransactionWithValidationRequest,
    responseSerialize: serialize_mempool_AddTransactionWithValidationResponse,
    responseDeserialize: deserialize_mempool_AddTransactionWithValidationResponse,
  },
  // Fetch ordered block of transactions
  getBlock: {
    path: '/mempool.Mempool/GetBlock',
    requestStream: false,
    responseStream: false,
    requestType: mempool_pb.GetBlockRequest,
    responseType: mempool_pb.GetBlockResponse,
    requestSerialize: serialize_mempool_GetBlockRequest,
    requestDeserialize: deserialize_mempool_GetBlockRequest,
    responseSerialize: serialize_mempool_GetBlockResponse,
    responseDeserialize: deserialize_mempool_GetBlockResponse,
  },
  // Remove committed transactions from Mempool
  commitTransactions: {
    path: '/mempool.Mempool/CommitTransactions',
    requestStream: false,
    responseStream: false,
    requestType: mempool_pb.CommitTransactionsRequest,
    responseType: mempool_pb.CommitTransactionsResponse,
    requestSerialize: serialize_mempool_CommitTransactionsRequest,
    requestDeserialize: deserialize_mempool_CommitTransactionsRequest,
    responseSerialize: serialize_mempool_CommitTransactionsResponse,
    responseDeserialize: deserialize_mempool_CommitTransactionsResponse,
  },
  // Check the health of mempool
  healthCheck: {
    path: '/mempool.Mempool/HealthCheck',
    requestStream: false,
    responseStream: false,
    requestType: mempool_pb.HealthCheckRequest,
    responseType: mempool_pb.HealthCheckResponse,
    requestSerialize: serialize_mempool_HealthCheckRequest,
    requestDeserialize: deserialize_mempool_HealthCheckRequest,
    responseSerialize: serialize_mempool_HealthCheckResponse,
    responseDeserialize: deserialize_mempool_HealthCheckResponse,
  },
};

exports.MempoolClient = grpc.makeGenericClientConstructor(MempoolService);
