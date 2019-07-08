import { Account } from './Accounts';
import { KeyFactory, Seed } from './KeyFactory';
import { Mnemonic } from './Mnemonic';

interface WalletConfig {
  mnemonic?: string;
  salt?: string;
}

export class LibraWallet {
  private readonly config: WalletConfig;
  private keyFactory: KeyFactory;
  private lastChild = 0;
  private accounts: { [address: string]: Account } = {};

  constructor(config?: WalletConfig) {
    this.config = config || {};
    const mnemonic = this.config.mnemonic === undefined ? new Mnemonic().toString() : this.config.mnemonic;
    this.config.mnemonic = mnemonic;
    const seed = Seed.fromMnemonic(mnemonic.split(' '), this.config.salt);
    this.keyFactory = new KeyFactory(seed);
  }

  public newAccount(): Account {
    const newAccount = this.generateAccount(this.lastChild);
    this.lastChild++;
    return newAccount;
  }

  public generateAccount(depth: number): Account {
    if (isNaN(depth)) {
      throw new Error(`depth [${depth}] must be a number`);
    }
    const account = new Account(this.keyFactory.generateKey(depth));
    this.addAccount(account);

    return account;
  }

  public addAccount(account: Account) {
    this.accounts[account.getAddress().toHex()] = account;
  }

  public getConfig() {
    return this.config;
  }
}

export default LibraWallet;
