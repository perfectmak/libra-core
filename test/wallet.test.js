"use strict";
exports.__esModule = true;
var Mnemonic_1 = require("../lib/wallet/Mnemonic");
describe('LibraWallet', function () {
    describe('generateMnemonic()', function () {
        it('should generate 100 unique mnemonic', function () {
            var mnemonics = [];
            for (var i = 0; i < 100; i++) {
                var mnemonic = new Mnemonic_1.Mnemonic().toString();
                mnemonics.push(mnemonic);
            }
            expect(new Set(mnemonics).slice().length).toBe(100);
        });
    });
});
//# sourceMappingURL=wallet.test.js.map