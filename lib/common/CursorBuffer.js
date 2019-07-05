"use strict";
exports.__esModule = true;
var bignumber_js_1 = require("bignumber.js");
/**
 * A wrapper around byte buffers to perform cursor reading on bytes
 * of different sizes
 *
 */
var CursorBuffer = /** @class */ (function () {
    function CursorBuffer(typedArray, littleEndian) {
        if (littleEndian === void 0) { littleEndian = true; }
        this.dataView = new DataView(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
        this.littleEndian = littleEndian;
        this.bytePositon = 0;
    }
    /**
     * Reads 1 byte
     *
     */
    CursorBuffer.prototype.read8 = function () {
        var value = this.dataView.getUint8(this.bytePositon);
        this.bytePositon += 1;
        return value;
    };
    /**
     * Reads 4 bytes
     *
     */
    CursorBuffer.prototype.read32 = function () {
        var value = this.dataView.getUint32(this.bytePositon, this.littleEndian);
        this.bytePositon += 4;
        return value;
    };
    /**
     * Reads 8 bytes
     *
     *
     */
    CursorBuffer.prototype.read64 = function () {
        var firstPart = this.read32();
        var secondPart = this.read32();
        var combined = this.littleEndian
            ? secondPart.toString(16) + firstPart.toString(16).padStart(8, '0')
            : firstPart.toString(16) + secondPart.toString(16).padStart(8, '0');
        return new bignumber_js_1["default"]("0x" + combined, 16);
    };
    CursorBuffer.prototype.readXBytes = function (x) {
        var startPosition = this.bytePositon + this.dataView.byteOffset;
        var value = new Uint8Array(this.dataView.buffer, startPosition, x);
        this.bytePositon += x;
        return value;
    };
    return CursorBuffer;
}());
exports.CursorBuffer = CursorBuffer;
//# sourceMappingURL=CursorBuffer.js.map