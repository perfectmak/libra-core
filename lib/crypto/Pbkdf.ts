import crypto from 'crypto';

export class Pbkdf {
  private readonly _digestAlgorithm: string;
  constructor(digestAlgorithm: string) {
    this._digestAlgorithm = digestAlgorithm;
  }

  extract(
    password: Uint8Array,
    salt: string,
    iterations: number,
    outputLen: number
  ) {
    return new Uint8Array(crypto.pbkdf2Sync(
      Buffer.from(password),
      salt,
      iterations,
      outputLen,
      this._digestAlgorithm
    ));
  }
}