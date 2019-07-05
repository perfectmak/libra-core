"use strict";
exports.__esModule = true;
var bignumber_js_1 = require("bignumber.js");
var sha3_1 = require("sha3");
var CursorBuffer_1 = require("../common/CursorBuffer");
var Addresses_1 = require("../constants/Addresses");
var Eddsa_1 = require("../crypto/Eddsa");
/**
 * Contains all the information relevant to a particular users accounts.
 * Beware of stale data though. Will implement refresh logic soon.
 *
 *
 */
var AccountState = /** @class */ (function () {
    function AccountState(authenticationKey, balance, receivedEventsCount, sentEventsCount, sequenceNumber) {
        this.balance = balance;
        this.sequenceNumber = sequenceNumber;
        this.authenticationKey = authenticationKey;
        this.sentEventsCount = sentEventsCount;
        this.receivedEventsCount = receivedEventsCount;
    }
    /**
     * Returns an empty AccountState
     */
    AccountState["default"] = function (address) {
        return new AccountState(new Uint8Array(Buffer.from(address, 'hex')), new bignumber_js_1["default"](0), new bignumber_js_1["default"](0), new bignumber_js_1["default"](0), new bignumber_js_1["default"](0));
    };
    AccountState.from = function (bytes) {
        var cursor = new CursorBuffer_1.CursorBuffer(bytes);
        var authenticationKeyLen = cursor.read32();
        var authenticationKey = cursor.readXBytes(authenticationKeyLen);
        var balance = cursor.read64();
        var receivedEventsCount = cursor.read64();
        var sentEventsCount = cursor.read64();
        var sequenceNumber = cursor.read64();
        return new AccountState(authenticationKey, balance, receivedEventsCount, sentEventsCount, sequenceNumber);
    };
    return AccountState;
}());
exports.AccountState = AccountState;
var Account = /** @class */ (function () {
    function Account(keyPair) {
        this.keyPair = keyPair;
    }
    Account.fromSecretKeyBytes = function (secretKeyBytes) {
        return new Account(Eddsa_1.KeyPair.fromSecretKey(secretKeyBytes));
    };
    Account.fromSecretKey = function (secretKeyHex) {
        var keyBytes = new Uint8Array(Buffer.from(secretKeyHex, 'hex'));
        return Account.fromSecretKeyBytes(keyBytes);
    };
    Account.prototype.getAddress = function () {
        if (this.address !== undefined) {
            return this.address;
        }
        var sha3 = new sha3_1.SHA3(256);
        sha3.update(Buffer.from(this.keyPair.getPublicKey()));
        this.address = new AccountAddress(new Uint8Array(sha3.digest()));
        return this.address;
    };
    return Account;
}());
exports.Account = Account;
/**
 * Represents a validated Account address
 *
 */
var AccountAddress = /** @class */ (function () {
    function AccountAddress(hash) {
        if (!AccountAddress.isValidBytes(hash)) {
            throw new Error("The address is of invalid length [" + hash.length + "]");
        }
        this.addressBytes = hash.slice(0, Addresses_1["default"].AddressLength);
    }
    AccountAddress.isValidString = function (addressHex) {
        var length = String(addressHex).replace(' ', '').length;
        return length === Addresses_1["default"].AddressLength * 2;
    };
    AccountAddress.isValidBytes = function (addressBytes) {
        return addressBytes.length === Addresses_1["default"].AddressLength;
    };
    AccountAddress["default"] = function () {
        return new AccountAddress(new Uint8Array(Addresses_1["default"].AddressLength));
    };
    AccountAddress.prototype.isDefault = function () {
        return AccountAddress["default"]().toHex() === this.toHex();
    };
    AccountAddress.prototype.toBytes = function () {
        return this.addressBytes;
    };
    AccountAddress.prototype.toHex = function () {
        return Buffer.from(this.addressBytes).toString('hex');
    };
    /**
     * Alias for toHex()
     */
    AccountAddress.prototype.toString = function () {
        return this.toHex();
    };
    return AccountAddress;
}());
exports.AccountAddress = AccountAddress;
//# sourceMappingURL=Accounts.js.map