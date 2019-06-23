import { eddsa as Eddsa } from 'elliptic';

export type Signature = Uint8Array;

export class KeyPair {
  private _eddsaPair: Eddsa.KeyPair;

  constructor(eddsaPair: Eddsa.KeyPair) {
    this._eddsaPair = eddsaPair;
  }

  static fromSecretKey(secretKey: Uint8Array): KeyPair {
    const eddsa = new Eddsa('ed25519');
    const eddsaPair = eddsa.keyFromSecret(Buffer.from(secretKey));
    return new KeyPair(eddsaPair);
  }

  sign(message: Uint8Array): Signature {
    const signatureBuffer = this._eddsaPair.sign(Buffer.from(message))
      .toBytes();
    return new Uint8Array(signatureBuffer);
  }

  verify(message: Uint8Array, signature: Signature): boolean {
    return this._eddsaPair.verify(
      Buffer.from(message),
      Buffer.from(signature)
    );
  }

  getSecretKey(): Uint8Array {
    return new Uint8Array(this._eddsaPair.getSecret());
  }

  getPublicKey(): Uint8Array {
    return new Uint8Array(this._eddsaPair.getPublic());
  }
}