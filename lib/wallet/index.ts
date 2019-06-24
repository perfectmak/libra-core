import { Account } from './accounts';
import { KeyFactory, Seed } from './KeyFactory';

interface WalletConfig {
  mnemonic: string;
  salt?: string;
}

export class LibraWallet {
  private readonly config: WalletConfig;
  private keyFactory: KeyFactory;
  private lastChild = 1;
  private accounts: { [address: string]: Account } = {};

  constructor(config: WalletConfig) {
    this.config = config;
    const seed = Seed.fromMnemonic(config.mnemonic.split(' '), config.salt);
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
}

export default LibraWallet;
