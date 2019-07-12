import { Mnemonic } from '../lib';

describe('LibraWallet', () => {
  describe('generateMnemonic()', () => {
    it('should generate 100 unique mnemonic', () => {
      const mnemonics = [];

      for (let i = 0; i < 100; i++) {
        const mnemonic = new Mnemonic().toString();
        mnemonics.push(mnemonic);
      }

      expect([...new Set(mnemonics)].length).toBe(100);
    });
  });
});
