import BigNumber from 'bignumber.js';

/**
 * A wrapper around byte buffers to perform cursor reading on bytes
 * of different sizes
 *
 */
export class CursorBuffer {
  private readonly dataView: DataView;
  private readonly littleEndian: boolean;
  private bytePositon: number;

  constructor(typedArray: Uint8Array, littleEndian = true) {
    this.dataView = new DataView(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
    this.littleEndian = littleEndian;
    this.bytePositon = 0;
  }

  /**
   * Reads 1 byte
   *
   */
  public read8(): number {
    const value = this.dataView.getUint8(this.bytePositon);
    this.bytePositon += 1;
    return value;
  }

  /**
   * Reads 4 bytes
   *
   */
  public read32(): number {
    const value = this.dataView.getUint32(this.bytePositon, this.littleEndian);
    this.bytePositon += 4;
    return value;
  }

  /**
   * Reads 8 bytes
   *
   *
   */
  public read64(): BigNumber {
    const firstPart = this.read32();
    const secondPart = this.read32();

    const combined = this.littleEndian
      ? secondPart.toString(16) + firstPart.toString(16).padStart(8, '0')
      : firstPart.toString(16) + secondPart.toString(16).padStart(8, '0');

    return new BigNumber(`0x${combined}`, 16);
  }

  public readXBytes(x: number): Uint8Array {
    const startPosition = this.bytePositon + this.dataView.byteOffset;
    const value = new Uint8Array(this.dataView.buffer, startPosition, x);
    this.bytePositon += x;

    return value;
  }

  /**
   * Read bool as 1 byte
   *
   */
  public readBool(): boolean {
    const value = this.dataView.getUint8(this.bytePositon);
    this.bytePositon += 1;
    if(value !== 0 && value !== 1) {
      throw new Error(`bool must be 0 or 1, found ${value}`);
    }
    return value !== 0;
  }
}
