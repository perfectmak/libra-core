import { Account } from './accounts';
import { KeyFactory, Seed } from './KeyFactory';

interface WalletConfig {
  mnemonic: string,
  salt?: string
}

export class LiberaWallet {
  private readonly _config: WalletConfig;
  private _keyFactory: KeyFactory;
  private _lastChild = 1;
  private accounts: {[address: string]: Account } = {};

  constructor(config: WalletConfig) {
    this._config = config;
    const seed = Seed.fromMnemonic(
      config.mnemonic.split(' '),
      config.salt
    );
    this._keyFactory = new KeyFactory(seed);
  }

  newAccount(): Account {
    const newAccount = this.generateAccount(this._lastChild);
    this._lastChild++;
    return newAccount;
  }

  generateAccount(depth: number): Account {
    if (isNaN(depth)) {
      throw new Error(`depth [${depth}] must be a number`)
    }
    const account = new Account(this._keyFactory.generateKey(depth));
    this.addAccount(account);

    return account;
  }

  addAccount(account: Account) {
    this.accounts[account.getAddress().toHex()] = account;
  }
}

export default LiberaWallet;