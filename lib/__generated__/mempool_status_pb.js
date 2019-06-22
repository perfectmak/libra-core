/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.mempool.MempoolAddTransactionStatus', null, global);
/**
 * @enum {number}
 */
proto.mempool.MempoolAddTransactionStatus = {
  VALID: 0,
  INSUFFICIENTBALANCE: 1,
  INVALIDSEQNUMBER: 2,
  MEMPOOLISFULL: 3,
  TOOMANYTRANSACTIONS: 4,
  INVALIDUPDATE: 5
};

goog.object.extend(exports, proto.mempool);
