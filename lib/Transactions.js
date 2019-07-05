"use strict";
exports.__esModule = true;
var bignumber_js_1 = require("bignumber.js");
var transaction_pb_1 = require("./__generated__/transaction_pb");
var Addresses_1 = require("./constants/Addresses");
var ProgamBase64Codes_1 = require("./constants/ProgamBase64Codes");
var Accounts_1 = require("./wallet/Accounts");
var LibraTransaction = /** @class */ (function () {
    /**
     * Create a new Transaction
     *
     * @param program
     * @param gasConstraint
     * @param expirationTime
     * @param sendersAddress
     * @param sequenceNumber
     */
    function LibraTransaction(program, gasConstraint, expirationTime, sendersAddress, sequenceNumber) {
        this.program = program;
        this.gasContraint = gasConstraint;
        this.expirationTime = new bignumber_js_1["default"](expirationTime);
        this.sendersAddress = new Accounts_1.AccountAddress(sendersAddress);
        this.sequenceNumber = new bignumber_js_1["default"](sequenceNumber);
    }
    LibraTransaction.createTransfer = function (recipientAddress, numAccount) {
        var amountBuffer = Buffer.alloc(8);
        amountBuffer.writeBigUInt64LE(BigInt(numAccount), 0);
        var programArguments = [
            {
                type: transaction_pb_1.TransactionArgument.ArgType.ADDRESS,
                value: Uint8Array.from(Buffer.from(recipientAddress, 'hex'))
            }, {
                type: transaction_pb_1.TransactionArgument.ArgType.U64,
                value: Uint8Array.from(amountBuffer)
            }
        ];
        var program = {
            arguments: programArguments,
            code: Uint8Array.from(Buffer.from(ProgamBase64Codes_1["default"].peerToPeerTxn, 'base64')),
            modules: []
        };
        return new LibraTransaction(program, {
            gasUnitPrice: new bignumber_js_1["default"](0),
            maxGasAmount: new bignumber_js_1["default"](1000000)
        }, "" + (Math.floor(new Date().getTime() / 1000) + 100), new Uint8Array(Addresses_1["default"].AddressLength), '-0');
    };
    return LibraTransaction;
}());
exports.LibraTransaction = LibraTransaction;
//# sourceMappingURL=Transactions.js.map