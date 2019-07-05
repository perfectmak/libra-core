"use strict";
exports.__esModule = true;
var KeyPrefixes_1 = require("../constants/KeyPrefixes");
var Eddsa_1 = require("../crypto/Eddsa");
var Hkdf_1 = require("../crypto/Hkdf");
var Pbkdf_1 = require("../crypto/Pbkdf");
var Mnemonic_1 = require("./Mnemonic");
/**
 * Seed is used by KeyFactory to generate
 * new key pairs for accounts
 *
 */
var Seed = /** @class */ (function () {
    /**
     *
     */
    function Seed(data) {
        if (data.length !== 32) {
            throw new Error('Seed data length must be 32 bits');
        }
        this.data = data;
    }
    Seed.fromMnemonic = function (words, salt) {
        if (salt === void 0) { salt = 'LIBRA'; }
        var mnemonic = Array.isArray(words) ? new Mnemonic_1.Mnemonic(words) : words;
        var bytes = new Pbkdf_1.Pbkdf('sha3-256').pbkdf2(mnemonic.toBytes(), Buffer.from("" + KeyPrefixes_1["default"].MnemonicSalt + salt), 2048, 32);
        return new Seed(bytes);
    };
    return Seed;
}());
exports.Seed = Seed;
var KeyFactory = /** @class */ (function () {
    function KeyFactory(seed) {
        this.seed = seed;
        this.hkdf = new Hkdf_1.Hkdf('sha3-256');
        this.masterPrk = this.hkdf.extract(this.seed.data, KeyPrefixes_1["default"].MasterKeySalt);
    }
    /**
     * Generates a new key pair at the number position.
     *
     */
    KeyFactory.prototype.generateKey = function (childDepth) {
        var childDepthBuffer = Buffer.alloc(8);
        childDepthBuffer.writeBigUInt64LE(BigInt(childDepth));
        var info = Buffer.concat([Uint8Array.from(Buffer.from(KeyPrefixes_1["default"].DerivedKey)),
            Uint8Array.from(childDepthBuffer)]);
        var secretKey = this.hkdf.expand(this.masterPrk, info, 32);
        return Eddsa_1.KeyPair.fromSecretKey(secretKey);
    };
    return KeyFactory;
}());
exports.KeyFactory = KeyFactory;
//# sourceMappingURL=KeyFactory.js.map