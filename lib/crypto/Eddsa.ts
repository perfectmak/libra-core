import { eddsa as Eddsa } from 'elliptic';

export type Signature = Uint8Array;

export class KeyPair {
  public static fromSecretKey(secretKey: Uint8Array): KeyPair {
    const eddsa = new Eddsa('ed25519');
    const eddsaPair = eddsa.keyFromSecret(Buffer.from(secretKey));
    return new KeyPair(eddsaPair);
  }
  private eddsaPair: Eddsa.KeyPair;

  constructor(eddsaPair: Eddsa.KeyPair) {
    this.eddsaPair = eddsaPair;
  }

  public sign(message: Uint8Array): Signature {
    const signatureBuffer = this.eddsaPair.sign(Buffer.from(message)).toBytes();
    return new Uint8Array(signatureBuffer);
  }

  public verify(message: Uint8Array, signature: Signature): boolean {
    return this.eddsaPair.verify(Buffer.from(message), Buffer.from(signature));
  }

  public getSecretKey(): Uint8Array {
    return new Uint8Array(this.eddsaPair.getSecret());
  }

  public getPublicKey(): Uint8Array {
    return new Uint8Array(this.eddsaPair.getPublic());
  }
}
