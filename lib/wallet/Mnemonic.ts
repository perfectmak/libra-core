import { generateMnemonic } from 'bip39';
import CollectionUtil from '../common/CollectionUtil';
import MnemonicWords from '../constants/MnemonicWords';

/**
 * Handles logic for loading, writing and encoding mnemonic strings
 *
 */
export class Mnemonic {
  private words: string[];
  constructor(words?: string[]) {
    if (!words) {
      const mnemonic = generateMnemonic(256);
      this.words = mnemonic.split(' ');
      return;
    }

    if (words.length < 6 || words.length % 6 !== 0) {
      throw new Error('Mnemonic must have a word count divisible with 6');
    }

    for (const word of words) {
      if (CollectionUtil.binarySearch(MnemonicWords, word) === null) {
        throw new Error('Mnemonic contains an unknown word');
      }
    }

    this.words = words;
  }

  public toString(): string {
    return this.words.join(' ');
  }

  public toBytes(): Uint8Array {
    // works only because mnemonic characters are asci
    const wordsString = this.toString();
    const buffer = new ArrayBuffer(wordsString.length);
    const uintArray = new Uint8Array(buffer);
    uintArray.forEach((_, idx: number) => {
      uintArray[idx] = wordsString.charCodeAt(idx);
    });

    return uintArray;
  }
}
