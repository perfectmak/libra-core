import BigNumber from 'bignumber.js';

/**
 * A wrapper around byte buffers to perform cursor reading on bytes 
 * of different sizes
 * 
 */
export class CursorBuffer {
  private readonly _dataView: DataView;
  private readonly _littleEndian: boolean;
  private _bytePositon: number;

  constructor(typedArray: Uint8Array, littleEndian = true) {
    this._dataView = new DataView(
      typedArray.buffer,
      typedArray.byteOffset,
      typedArray.byteLength
    );
    this._littleEndian = littleEndian;
    this._bytePositon = 0;
  }

  /**
   * Reads 1 byte
   * 
   */
  public read8(): number {
    const value = this._dataView.getUint8(this._bytePositon);
    this._bytePositon += 1;
    return value
  }

  /**
   * Reads 4 bytes
   * 
   */
  public read32(): number {
    const value = this._dataView.getUint32(this._bytePositon, this._littleEndian);
    this._bytePositon += 4;
    return value
  }

  /**
   * Reads 8 bytes
   * 
   * 
   */
  public read64(): BigNumber {
    const firstPart = this.read32();
    const secondPart = this.read32();

    const combined = this._littleEndian ?
      secondPart.toString(16) + firstPart.toString(16).padStart(8, '0') :
      firstPart.toString(16) + secondPart.toString(16).padStart(8, '0');

    return new BigNumber(`0x${combined}`, 16);
  }

  public readXBytes(x: number): Uint8Array {
    const startPosition = this._bytePositon + this._dataView.byteOffset;
    const value = new Uint8Array(this._dataView.buffer, startPosition, x)
    this._bytePositon += x;

    return value;
  }
}