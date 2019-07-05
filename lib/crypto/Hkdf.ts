/* tslint:disable */
const hkdf = require('futoin-hkdf');
/* tslint:enable */
type BuffString = Buffer | string;

// Todo: Update implementation to work not only with Node
export class Hkdf {
  private hashAlgorithm: string;

  constructor(hashAlgorithm: string) {
    this.hashAlgorithm = hashAlgorithm;
  }

  public extract(ikm: Uint8Array, salt: string): Uint8Array {
    const ikmBuffer = Buffer.from(ikm);
    const prk = hkdf.extract(this.hashAlgorithm, this.hashLength, ikmBuffer, salt);
    return new Uint8Array(prk);
  }

  public expand(prk: Uint8Array, info: BuffString, outputLen: number): Uint8Array {
    const prkBuffer = Buffer.from(prk);
    const okm = hkdf.expand(this.hashAlgorithm, this.hashLength, prkBuffer, outputLen, info);
    return new Uint8Array(okm);
  }

  get hashLength(): number {
    return hkdf.hash_length(this.hashAlgorithm);
  }
}
