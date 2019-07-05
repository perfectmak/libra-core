"use strict";
exports.__esModule = true;
/* tslint:disable */
var hkdf = require('futoin-hkdf');
// Todo: Update implementation to work not only with Node
var Hkdf = /** @class */ (function () {
    function Hkdf(hashAlgorithm) {
        this.hashAlgorithm = hashAlgorithm;
    }
    Hkdf.prototype.extract = function (ikm, salt) {
        var ikmBuffer = Buffer.from(ikm);
        var prk = hkdf.extract(this.hashAlgorithm, this.hashLength, ikmBuffer, salt);
        return new Uint8Array(prk);
    };
    Hkdf.prototype.expand = function (prk, info, outputLen) {
        var prkBuffer = Buffer.from(prk);
        var okm = hkdf.expand(this.hashAlgorithm, this.hashLength, prkBuffer, outputLen, info);
        return new Uint8Array(okm);
    };
    Object.defineProperty(Hkdf.prototype, "hashLength", {
        get: function () {
            return hkdf.hash_length(this.hashAlgorithm);
        },
        enumerable: true,
        configurable: true
    });
    return Hkdf;
}());
exports.Hkdf = Hkdf;
//# sourceMappingURL=Hkdf.js.map