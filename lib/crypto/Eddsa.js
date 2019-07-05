"use strict";
exports.__esModule = true;
var elliptic_1 = require("elliptic");
var KeyPair = /** @class */ (function () {
    function KeyPair(eddsaPair) {
        this.eddsaPair = eddsaPair;
    }
    KeyPair.fromSecretKey = function (secretKey) {
        var eddsa = new elliptic_1.eddsa('ed25519');
        var eddsaPair = eddsa.keyFromSecret(Buffer.from(secretKey));
        return new KeyPair(eddsaPair);
    };
    KeyPair.prototype.sign = function (message) {
        var signatureBuffer = this.eddsaPair.sign(Buffer.from(message)).toBytes();
        return new Uint8Array(signatureBuffer);
    };
    KeyPair.prototype.verify = function (message, signature) {
        return this.eddsaPair.verify(Buffer.from(message), Buffer.from(signature));
    };
    KeyPair.prototype.getSecretKey = function () {
        return new Uint8Array(this.eddsaPair.getSecret());
    };
    KeyPair.prototype.getPublicKey = function () {
        return new Uint8Array(this.eddsaPair.getPublic());
    };
    return KeyPair;
}());
exports.KeyPair = KeyPair;
//# sourceMappingURL=Eddsa.js.map