import KeyPrefixes from '../constants/KeyPrefixes';
import { KeyPair } from '../crypto/EdDsa';
import { Hkdf } from '../crypto/Hkdf';
import { Pbkdf } from '../crypto/Pbkdf';
import { Mnemonic } from './Mnemonic';

/**
 * Seed is used by KeyFactory to generate
 * new key pairs for accounts
 *
 */
export class Seed {

  public static fromMnemonic(words: string[] | Mnemonic, salt: string = 'LIBRA'): Seed {
    const mnemonic: Mnemonic = Array.isArray(words) ? new Mnemonic(words) : words;
    const mnemonicBytes = mnemonic.toBytes();
    const parsedSalt = `${KeyPrefixes.MnemonicSalt}${salt}`;

    const bytes = new Pbkdf('sha3-256').extract(mnemonicBytes, parsedSalt, 2048, 32);
    return new Seed(bytes);
  }
  public readonly data: Uint8Array;

  /**
   *
   */
  constructor(data: Uint8Array) {
    if (data.length !== 32) {
      throw new Error('Seed data length must be 32 bits');
    }
    this.data = data;
  }
}

export class KeyFactory {
  private readonly seed: Seed;
  private readonly hkdf: Hkdf;
  private readonly masterPrk: Uint8Array;

  constructor(seed: Seed) {
    this.seed = seed;
    this.hkdf = new Hkdf('sha3-256');
    this.masterPrk = this.hkdf.extract(this.seed.data, KeyPrefixes.MasterKeySalt);
  }

  /**
   * Generates a new key pair at the number position.
   *
   */
  public generateKey(childDepth: number): KeyPair {
    const info = `${KeyPrefixes.DerivedKey}${childDepth}`;
    const secretKey = this.hkdf.expand(this.masterPrk, info, 32);

    return KeyPair.fromSecretKey(secretKey);
  }
}
