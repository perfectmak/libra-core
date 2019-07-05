"use strict";
exports.__esModule = true;
var Accounts_1 = require("./Accounts");
var KeyFactory_1 = require("./KeyFactory");
var Mnemonic_1 = require("./Mnemonic");
var LibraWallet = /** @class */ (function () {
    function LibraWallet(config) {
        this.lastChild = 0;
        this.accounts = {};
        this.config = config || {};
        var mnemonic = (this.config.mnemonic === undefined) ? new Mnemonic_1.Mnemonic().toString() : this.config.mnemonic;
        this.config.mnemonic = mnemonic;
        var seed = KeyFactory_1.Seed.fromMnemonic(mnemonic.split(' '), this.config.salt);
        this.keyFactory = new KeyFactory_1.KeyFactory(seed);
    }
    LibraWallet.prototype.newAccount = function () {
        var newAccount = this.generateAccount(this.lastChild);
        this.lastChild++;
        return newAccount;
    };
    LibraWallet.prototype.generateAccount = function (depth) {
        if (isNaN(depth)) {
            throw new Error("depth [" + depth + "] must be a number");
        }
        var account = new Accounts_1.Account(this.keyFactory.generateKey(depth));
        this.addAccount(account);
        return account;
    };
    LibraWallet.prototype.addAccount = function (account) {
        this.accounts[account.getAddress().toHex()] = account;
    };
    LibraWallet.prototype.getConfig = function () {
        return this.config;
    };
    return LibraWallet;
}());
exports.LibraWallet = LibraWallet;
exports["default"] = LibraWallet;
//# sourceMappingURL=index.js.map