export const CollectionUtil = {
  binarySearch<T>(sortedArray: Array<T>, item: T): number | null {
    let lowIdx = 0;
    let highIdx = sortedArray.length - 1;
    while (lowIdx <= highIdx) {
      let midIdx = Math.floor((lowIdx + highIdx) / 2);
      if (sortedArray[midIdx] == item) {
        return midIdx;
      } else if (sortedArray[midIdx] < item) {
        lowIdx = midIdx + 1;
      } else {
        highIdx = midIdx - 1;
      }
    }
    return null;
  }
}

export default CollectionUtil;