import { LibraClient, LibraNetwork, LibraWallet, LibraAdmissionControlStatus } from '../lib';

describe('LibraClient', () => {
  it('should query account state and transfer', async () => {
    const client = new LibraClient({ network: LibraNetwork.Testnet });
    const wallet = new LibraWallet({
      mnemonic:
        'lend arm arm addict trust release grid unlock exhibit surround deliver front link bean night dry tuna pledge expect net ankle process mammal great',
    });

    // TEST ACCOUNT CREATION
    const account1 = wallet.newAccount();
    const account1Address = account1.getAddress().toHex();
    let account1State = await client.getAccountState(account1Address);

    const account2 = wallet.newAccount();
    const account2Address = account2.getAddress().toHex();
    const account2State = await client.getAccountState(account2Address);

    const amountToTransfer = 1e6;

    // TEST MINITNG Amount
    await client.mintWithFaucetService(account1Address, amountToTransfer);
    const newAccount1State = await client.getAccountState(account1Address);
    // ensure its balance is +xAmount
    expect(newAccount1State.balance.toString(10)).toEqual(account1State.balance.plus(amountToTransfer).toString(10));

    // TEST TRANSFER TRANSACTION OF yAmount
    account1State = await client.getAccountState(account1Address);
    const response = await client.transferCoins(account1, account2Address, amountToTransfer);
    expect(response.acStatus).toEqual(LibraAdmissionControlStatus.ACCEPTED);

    // ensure new account balance is +yAmount
    await response.awaitConfirmation(client);
    const newAccount2State = await client.getAccountState(account2Address);
    expect(newAccount2State.balance.toString(10)).toEqual(account2State.balance.plus(amountToTransfer).toString(10));
  }, 30000);
});
