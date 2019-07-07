# Libra Core 

Libra Core is a javascript library client that can be used to interact with libra nodes. It is built using typescript.

> This is still under heavy testing, so please report any issues that you might encounter using it.

The end goal is to make it usable both in node and on browser clients too, but currently it is mostly compatible with node.

## Installation
To install with npm run:

```
npm install libra-core
```

## Usage

You would most likely interact with these two modules

```javascript
import { LibraWallet, LibraClient } from 'libra-core';
```

### Creating an Account

In order to create a libra account, you would need to instantiate the `LibraWallet` like:

```javascript
// you may need to use require for node
import { LibraWallet, Account as LibraAccount } from 'libra-core';

// please don't use this mnemonic outside of this sample code
// also mnemonics are optional. If you don't specify one a random mnemonic is generated and used.
const wallet = new LibraWallet({
        mnemonic: 'upgrade salt toy stable drop paddle'
      });

// generate a new account
const account = wallet.newAccount();

// or if you have your secret key you can create an account from it
// const secretKey = 'pub-hex-secret-key-here' 
// const account = LibraAccount.fromSecretKey(secretKey);


// you can see your address by:
console.log(account.getAddress().toHex());
```

### Minting Amount
> Currently minting only works for testnet and uses the faucet service.

To mint you need to create a `LibraClient` and use it to mint

```javascript
import { LibraClient, LibraNetwork } from 'libra-core';

async function main() {
  const client = new LibraClient({ network: LibraNetwork.Testnet });

  const account = wallet.newAccount();

  // mint 2 libracoins to users accounts
  await client.mintWithFaucetService(account.getAddress(), 20e6);
}

await main();

```

### Checking an address balance

```javascript
async function main() {
  const client = new LibraClient({ network: LibraNetwork.Testnet });

  const accountAddress = '854563c50d20788fb6c11fac1010b553d722edb0c02f87c2edbdd3923726d13f';
  const accountState = await client.getAccountState(accountAddress);

  // log account balance
  console.log(accountState.balance.toString());

  // Account state has other information that you could be interested in such as `sequenceNumber`.
}

await main();
```

### Transferring Libra Coins

```javascript
async function main() {
  const client = new LibraClient({ network: LibraNetwork.Testnet });
  const wallet = new LibraWallet({
    mnemonic:
     'lend arm arm addict trust release grid unlock exhibit surround deliver front link bean night dry tuna pledge expect net ankle process mammal great',

  });
  const account = wallet.newAccount();
  const account2Address = '854563c50d20788fb6c11fac1010b553d722edb0c02f87c2edbdd3923726d13f';
  await client.transferCoins(account, account2Address, 1e6);
}

await main();
```

### Executing Transactions with Custom Program
You will eventually be able to transfer libra coins from your account to another account using `client.execute()` function, but it is also still a work in progress.
You are welcome to help contribute to making this work as well.

## Development
- Clone the repository
- Run `npm install` to install the dependency
- Test with `npm test`
- You might need to run `npm install -g grpc-tools` if you want to regenerate protobuffer classes

## Contribution
Feel free to contribute by opening issues or PR's to this repository

## License
MIT
