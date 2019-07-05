"use strict";
exports.__esModule = true;
var bip39_1 = require("bip39");
var CollectionUtil_1 = require("../common/CollectionUtil");
var MnemonicWords_1 = require("../constants/MnemonicWords");
/**
 * Handles logic for loading, writing and encoding mnemonic strings
 *
 */
var Mnemonic = /** @class */ (function () {
    function Mnemonic(words) {
        if (!words) {
            var mnemonic = bip39_1.generateMnemonic(256);
            this.words = mnemonic.split(' ');
            return;
        }
        if (words.length < 6 || words.length % 6 !== 0) {
            throw new Error('Mnemonic must have a word count divisible with 6');
        }
        for (var _i = 0, words_1 = words; _i < words_1.length; _i++) {
            var word = words_1[_i];
            if (CollectionUtil_1["default"].binarySearch(MnemonicWords_1["default"], word) === null) {
                throw new Error('Mnemonic contains an unknown word');
            }
        }
        this.words = words;
    }
    Mnemonic.prototype.toString = function () {
        return this.words.join(' ');
    };
    Mnemonic.prototype.toBytes = function () {
        // works only because mnemonic characters are asci
        var wordsString = this.toString();
        var buffer = new ArrayBuffer(wordsString.length);
        var uintArray = new Uint8Array(buffer);
        uintArray.forEach(function (_, idx) {
            uintArray[idx] = wordsString.charCodeAt(idx);
        });
        return uintArray;
    };
    return Mnemonic;
}());
exports.Mnemonic = Mnemonic;
//# sourceMappingURL=Mnemonic.js.map