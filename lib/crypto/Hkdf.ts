const hkdf = require('futoin-hkdf');

// Todo: Update implementation to work not only with Node
export class Hkdf {
  private _hashAlgorithm: string;

  constructor(hashAlgorithm: string) {
    this._hashAlgorithm = hashAlgorithm;
  }

  extract(ikm: Uint8Array, salt: string): Uint8Array {
    const ikmBuffer = Buffer.from(ikm);
    const prk = hkdf.extract(this._hashAlgorithm, this.hashLength, ikmBuffer, salt);
    return new Uint8Array(prk.buffer);
  }

  expand(prk: Uint8Array, info: string, outputLen: number): Uint8Array {
    const prkBuffer = Buffer.from(prk);
    const okm = hkdf.expand(this._hashAlgorithm, this.hashLength, prkBuffer, outputLen, info);
    return new Uint8Array(okm.buffer);
  }

  get hashLength(): number {
    return hkdf.hash_length(this._hashAlgorithm);
  }
}