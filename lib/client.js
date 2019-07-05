"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var bignumber_js_1 = require("bignumber.js");
var grpc_1 = require("grpc");
var sha3_1 = require("sha3");
var admission_control_grpc_pb_1 = require("./__generated__/admission_control_grpc_pb");
var admission_control_pb_1 = require("./__generated__/admission_control_pb");
var get_with_proof_pb_1 = require("./__generated__/get_with_proof_pb");
var transaction_pb_1 = require("./__generated__/transaction_pb");
var CursorBuffer_1 = require("./common/CursorBuffer");
var HashSaltValues_1 = require("./constants/HashSaltValues");
var PathValues_1 = require("./constants/PathValues");
var Transactions_1 = require("./Transactions");
var Accounts_1 = require("./wallet/Accounts");
var DefaultFaucetServerHost = 'faucet.testnet.libra.org';
var DefaultTestnetServerHost = 'ac.testnet.libra.org';
var LibraNetwork;
(function (LibraNetwork) {
    LibraNetwork["Testnet"] = "testnet";
    // Mainnet = 'mainnet'
})(LibraNetwork = exports.LibraNetwork || (exports.LibraNetwork = {}));
var LibraClient = /** @class */ (function () {
    function LibraClient(config) {
        this.config = config;
        if (config.host === undefined) {
            // since only testnet for now
            this.config.host = DefaultTestnetServerHost;
        }
        if (config.port === undefined) {
            this.config.port = '80';
        }
        var connectionAddress = this.config.host + ":" + this.config.port;
        this.client = new admission_control_grpc_pb_1.AdmissionControlClient(connectionAddress, grpc_1.credentials.createInsecure());
    }
    /**
     * Fetch the current state of an account.
     *
     *
     * @param {string} address Accounts address
     */
    LibraClient.prototype.getAccountState = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAccountStates([address])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result[0]];
                }
            });
        });
    };
    /**
     * Fetches the current state of multiple accounts.
     *
     * @param {string[]} addresses Array of users addresses
     */
    LibraClient.prototype.getAccountStates = function (addresses) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, addresses_1, address, request;
            var _this = this;
            return __generator(this, function (_a) {
                for (_i = 0, addresses_1 = addresses; _i < addresses_1.length; _i++) {
                    address = addresses_1[_i];
                    if (!Accounts_1.AccountAddress.isValidString(address)) {
                        throw new Error("[" + address + "] is not a valid address");
                    }
                }
                request = new get_with_proof_pb_1.UpdateToLatestLedgerRequest();
                addresses.forEach(function (address) {
                    var requestItem = new get_with_proof_pb_1.RequestItem();
                    var getAccountStateRequest = new get_with_proof_pb_1.GetAccountStateRequest();
                    getAccountStateRequest.setAddress(Uint8Array.from(Buffer.from(address, 'hex')));
                    requestItem.setGetAccountStateRequest(getAccountStateRequest);
                    request.addRequestedItems(requestItem);
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.client.updateToLatestLedger(request, function (error, response) {
                            if (error) {
                                return reject(error);
                            }
                            resolve(response.getResponseItemsList().map(function (item, index) {
                                var stateResponse = item.getGetAccountStateResponse();
                                var stateWithProof = stateResponse.getAccountStateWithProof();
                                if (stateWithProof.hasBlob()) {
                                    var stateBlob = stateWithProof.getBlob();
                                    var blob = stateBlob.getBlob_asU8();
                                    return _this._decodeAccountStateBlob(blob);
                                }
                                return Accounts_1.AccountState["default"](addresses[index]);
                            }));
                        });
                    })];
            });
        });
    };
    /**
     * Uses the faucetService on testnet to mint coins to be sent
     * to receiver.
     *
     * Returns the sequence number for the transaction used to mint
     *
     * Note: `numCoins` should be in base unit i.e microlibra (10^6 I believe).
     */
    LibraClient.prototype.mintWithFaucetService = function (receiver, numCoins, waitForConfirmation) {
        if (waitForConfirmation === void 0) { waitForConfirmation = true; }
        return __awaiter(this, void 0, void 0, function () {
            var serverHost, coins, address, response, sequenceNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serverHost = this.config.faucetServerHost || DefaultFaucetServerHost;
                        coins = new bignumber_js_1["default"](numCoins).toString(10);
                        address = receiver.toString();
                        return [4 /*yield*/, axios_1["default"].get("http://" + serverHost + "?amount=" + coins + "&address=" + address)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            throw new Error("Failed to query faucet service. Code: " + response.status + ", Err: " + response.data.toString());
                        }
                        sequenceNumber = response.data;
                        if (!waitForConfirmation) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.waitForConfirmation(Accounts_1.AccountAddress["default"](), sequenceNumber)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, sequenceNumber];
                }
            });
        });
    };
    /**
     * Keeps polling the account state of address till sequenceNumber is computed.
     *
     */
    LibraClient.prototype.waitForConfirmation = function (accountAddress, transactionSequenceNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var sequenceNumber, address, maxIterations, poll;
            var _this = this;
            return __generator(this, function (_a) {
                sequenceNumber = new bignumber_js_1["default"](transactionSequenceNumber);
                address = accountAddress.toString();
                maxIterations = 50;
                poll = function (resolve, reject) {
                    setTimeout(function () {
                        maxIterations--;
                        _this.getAccountState(address)
                            .then(function (accountState) {
                            if (accountState.sequenceNumber.gte(sequenceNumber)) {
                                return resolve();
                            }
                            if (maxIterations === -1) {
                                reject(new Error("Confirmation timeout for [" + address + "]:[" + sequenceNumber.toString(10) + "]"));
                            }
                            else {
                                poll(resolve, reject);
                            }
                        })["catch"](reject);
                    }, 500);
                };
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        poll(resolve, reject);
                    })];
            });
        });
    };
    /**
     * Transfer coins from sender to receipient.
     * numCoins should be in libraCoins based unit.
     *
     * @param sender
     * @param recipientAddress
     * @param numCoins
     */
    LibraClient.prototype.transferCoins = function (sender, recipientAddress, numCoins) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.execute(Transactions_1.LibraTransaction.createTransfer(recipientAddress, new bignumber_js_1["default"](numCoins)), sender)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Execute a transaction by sender.
     *
     * @param transaction
     * @param sender
     */
    LibraClient.prototype.execute = function (transaction, sender) {
        return __awaiter(this, void 0, void 0, function () {
            var senderAddress, sequenceNumber, senderAccountState, program, transactionArguments, rawTransaction, signedTransaction, request, rawTxnBytes, hash, senderSignature;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        senderAddress = transaction.sendersAddress;
                        if (senderAddress.isDefault()) {
                            senderAddress = sender.getAddress();
                        }
                        sequenceNumber = transaction.sequenceNumber;
                        if (!sequenceNumber.isNegative()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getAccountState(senderAddress.toHex())];
                    case 1:
                        senderAccountState = _a.sent();
                        sequenceNumber = senderAccountState.sequenceNumber;
                        _a.label = 2;
                    case 2:
                        program = new transaction_pb_1.Program();
                        program.setCode(transaction.program.code);
                        transactionArguments = new Array();
                        transaction.program.arguments.forEach(function (argument) {
                            var transactionArgument = new transaction_pb_1.TransactionArgument();
                            transactionArgument.setType(argument.type);
                            transactionArgument.setData(argument.value);
                            transactionArguments.push(transactionArgument);
                        });
                        program.setArgumentsList(transactionArguments);
                        program.setModulesList(transaction.program.modules);
                        rawTransaction = new transaction_pb_1.RawTransaction();
                        rawTransaction.setExpirationTime(transaction.expirationTime.toNumber());
                        rawTransaction.setGasUnitPrice(transaction.gasContraint.gasUnitPrice.toNumber());
                        rawTransaction.setMaxGasAmount(transaction.gasContraint.maxGasAmount.toNumber());
                        rawTransaction.setSequenceNumber(sequenceNumber.toNumber());
                        rawTransaction.setProgram(program);
                        rawTransaction.setSenderAccount(senderAddress.toBytes());
                        signedTransaction = new transaction_pb_1.SignedTransaction();
                        request = new admission_control_pb_1.SubmitTransactionRequest();
                        rawTxnBytes = rawTransaction.serializeBinary();
                        hash = new sha3_1["default"](256)
                            .update(Buffer.from(HashSaltValues_1["default"].rawTransactionHashSalt, 'hex'))
                            .update(Buffer.from(rawTxnBytes.buffer))
                            .digest();
                        senderSignature = sender.keyPair.sign(hash);
                        signedTransaction.setRawTxnBytes(rawTxnBytes);
                        signedTransaction.setSenderPublicKey(sender.keyPair.getPublicKey());
                        signedTransaction.setSenderSignature(senderSignature);
                        request.setSignedTxn(signedTransaction);
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                _this.client.submitTransaction(request, function (error, response) {
                                    if (error) {
                                        return reject(error);
                                    }
                                    resolve(response);
                                });
                            })];
                }
            });
        });
    };
    LibraClient.prototype._decodeAccountStateBlob = function (blob) {
        var cursor = new CursorBuffer_1.CursorBuffer(blob);
        var blobLen = cursor.read32();
        var state = {};
        for (var i = 0; i < blobLen; i++) {
            var keyLen = cursor.read32();
            var keyBuffer = new Uint8Array(keyLen);
            for (var j = 0; j < keyLen; j++) {
                keyBuffer[j] = cursor.read8();
            }
            var valueLen = cursor.read32();
            var valueBuffer = new Uint8Array(valueLen);
            for (var k = 0; k < valueLen; k++) {
                valueBuffer[k] = cursor.read8();
            }
            state[Buffer.from(keyBuffer).toString('hex')] = valueBuffer;
        }
        return Accounts_1.AccountState.from(state[PathValues_1["default"].AccountStatePath]);
    };
    return LibraClient;
}());
exports.LibraClient = LibraClient;
exports["default"] = LibraClient;
//# sourceMappingURL=client.js.map