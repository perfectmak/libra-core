# Libra Core 

Libra Core is a javascript library client that can be used to interact to the libra nodes.

> This is still under heavy development and testing, so not ready yet

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
import { LibraWallet } from 'libra-core';

// please don't use this mnemonic outside of this sample code
const wallet = new LibraWallet({
        mnemonic: 'upgrade salt toy stable drop paddle'
      });

const account = wallet.newAccount();

// you can see your address by:
console.log(account.getAddress().toHex());
```

### Minting Amount
> Currently minting only works for testnet and uses the faucet service.

To mint you need to create a `LibraClient` and use it to mint

```javascript
import { LibraClient, LiberaNetwork } from 'libra-core';

async function main() {
  const client = new LibraClient({ network: LiberaNetwork.Testnet });

  const account = wallet.newAccount();

  // mint 2 libracoins to users accounts
  await client.mintWithFaucetService(account.getAddress(), 20e6)
}

await main();

```

### Checking an address balance

```javascript
async function main() {
  const client = new LibraClient({ network: LiberaNetwork.Testnet });

  const accountAddress = '854563c50d20788fb6c11fac1010b553d722edb0c02f87c2edbdd3923726d13f';
  const accountState = await client.getAccountState(accountsAddress);

  // log account balance
  console.log(accountState.balance.toString())

  // Account state has other information that you could be interested in such as `sequenceNumber`.
}

await main();
```

### Transferring Libra Coins

You will eventually be able to transfer libra coins from your account to another account using `client.transferCoins()` function, but it is still a work in progress.
You are welcome to help contribute to making this work.

### Executing Transactions with Custom Program
You will eventually be able to transfer libra coins from your account to another account using `client.execute()` function, but it is also still a work in progress.
You are welcome to help contribute to making this work as well.

## Contribution
Feel free to contribute by opening issues or PR's to this repository
