import BigNumber from 'bignumber.js';

export class EventHandle {
  public readonly key: Uint8Array;
  public readonly count: BigNumber;

  public constructor(
    key: Uint8Array,
    count: BigNumber
  ) {
    this.key = key;
    this.count = count;
  }

  public static default(): EventHandle {
    return new EventHandle(
      new Uint8Array(),
      new BigNumber(0));
  }

}