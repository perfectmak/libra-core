"use strict";
exports.__esModule = true;
exports.CollectionUtil = {
    binarySearch: function (sortedArray, item) {
        var lowIdx = 0;
        var highIdx = sortedArray.length - 1;
        while (lowIdx <= highIdx) {
            var midIdx = Math.floor((lowIdx + highIdx) / 2);
            if (sortedArray[midIdx] === item) {
                return midIdx;
            }
            else if (sortedArray[midIdx] < item) {
                lowIdx = midIdx + 1;
            }
            else {
                highIdx = midIdx - 1;
            }
        }
        return null;
    },
};
exports["default"] = exports.CollectionUtil;
//# sourceMappingURL=CollectionUtil.js.map