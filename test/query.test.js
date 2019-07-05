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
var _this = this;
exports.__esModule = true;
var lib_1 = require("../lib");
describe('LibraClient.query*()', function () {
    describe('queryBalance()', function () {
        it('should query balance', function () { return __awaiter(_this, void 0, void 0, function () {
            var client, wallet, account1, account1Address, account2, account2Address, yAmount, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new lib_1.LibraClient({ network: lib_1.LibraNetwork.Testnet });
                        wallet = new lib_1.LibraWallet({
                            mnemonic: 
                            // 'upgrade salt toy stable drop paddle service supply display enhance spin polar rice convince exile laundry bounce reopen believe elevator craft display genre pink',
                            // 'lend arm arm addict trust release grid unlock exhibit surround deliver front link bean night dry tuna pledge expect net ankle process mammal great',
                            'bus noble spring fox sound donkey shell issue virtual subway library vocal during sunny rent twenty issue profit raccoon valid luxury clay place talk',
                        });
                        account1 = wallet.newAccount();
                        account1Address = account1.getAddress().toHex();
                        console.log('User 1 address is', account1Address);
                        account2 = wallet.newAccount();
                        account2Address = account2.getAddress().toHex();
                        console.log('User 2 address is', account2Address);
                        yAmount = 1e6;
                        return [4 /*yield*/, client.transferCoins(account1, account2Address, yAmount)];
                    case 1:
                        response = _a.sent();
                        console.log('getAcStatus:' + response.getAcStatus());
                        console.log('getMempoolStatus:' + response.getMempoolStatus());
                        console.log('getStatusCase:' + response.getStatusCase());
                        console.log('getValidatorId:' + response.getValidatorId());
                        console.log('getVmStatus:' + response.getVmStatus());
                        console.log('getJsPbMessageId:' + response.getJsPbMessageId());
                        return [2 /*return*/];
                }
            });
        }); }, 3000000);
    });
});
//# sourceMappingURL=query.test.js.map