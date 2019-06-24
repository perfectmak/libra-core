import crypto from 'crypto';

export class Pbkdf {
  private readonly digestAlgorithm: string;
  constructor(digestAlgorithm: string) {
    this.digestAlgorithm = digestAlgorithm;
  }

  public extract(password: Uint8Array, salt: string, iterations: number, outputLen: number) {
    return new Uint8Array(crypto.pbkdf2Sync(Buffer.from(password), salt, iterations, outputLen, this.digestAlgorithm));
  }
}
