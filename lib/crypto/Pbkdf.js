"use strict";
exports.__esModule = true;
var crypto_1 = require("crypto");
var Pbkdf = /** @class */ (function () {
    function Pbkdf(digestAlgorithm) {
        this.digestAlgorithm = digestAlgorithm;
    }
    Pbkdf.prototype.extract = function (password, salt, iterations, outputLen) {
        return new Uint8Array(crypto_1["default"].pbkdf2Sync(Buffer.from(password), salt, iterations, outputLen, this.digestAlgorithm));
    };
    Pbkdf.prototype.pbkdf2 = function (password, salt, iterations, outputLen) {
        var hmacLength = crypto_1["default"].createHmac(this.digestAlgorithm, 'test').digest().length;
        var outputBuffer = Buffer.alloc(outputLen);
        var hmacOutput = Buffer.alloc(hmacLength);
        var block = Buffer.alloc(salt.length + 4);
        var leftLength = Math.ceil(outputLen / hmacLength);
        var rightLength = outputLen - (leftLength - 1) * hmacLength;
        salt.copy(block, 0, 0, salt.length);
        for (var i = 1; i <= leftLength; i++) {
            block.writeUInt32BE(i, salt.length);
            var hmac = crypto_1["default"].createHmac(this.digestAlgorithm, password).update(block).digest();
            hmac.copy(hmacOutput, 0, 0, hmacLength);
            for (var j = 1; j < iterations; j++) {
                hmac = crypto_1["default"].createHmac(this.digestAlgorithm, password).update(hmac).digest();
                for (var k = 0; k < hmacLength; k++) {
                    // tslint:disable-next-line:no-bitwise
                    hmacOutput[k] ^= hmac[k];
                }
            }
            var destPos = (i - 1) * hmacLength;
            var len = (i === leftLength ? rightLength : hmacLength);
            hmacOutput.copy(outputBuffer, destPos, 0, len);
        }
        return outputBuffer;
    };
    return Pbkdf;
}());
exports.Pbkdf = Pbkdf;
//# sourceMappingURL=Pbkdf.js.map