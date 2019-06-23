import { LiberaClient, LiberaWallet } from '../lib';

describe('LibraClient.query*()', () => {
  describe('queryBalance()', () => {
    it('should query balance', async () => {
      const client = new LiberaClient({ host: 'ac.testnet.libra.org', port: '80' });
      const wallet = new LiberaWallet({
        mnemonic: 'upgrade salt toy stable drop paddle service supply display enhance spin polar rice convince exile laundry bounce reopen believe elevator craft display genre pink'
      })

      // TEST FLOW
      // create a new account
      const account1 = wallet.newAccount();
      const account2 = wallet.newAccount();

      const account1Address = account1.getAddress().toHex();
      console.log('User 1 address is', account1Address);
      let account1State = await client.getAccountState(account1Address);

      // mint x amount
      const xAmount = 20e6;
      await client.mintWithFaucetService(account1Address, xAmount)
      // ensure its balance is +x amount
      const newAccount1State = await client.getAccountState(account1Address);
      expect(
        newAccount1State.balance.toString(10)
      ).toEqual(account1State.balance.plus(xAmount).toString(10))

      // transfer y amount to new account

      // ensure new account balance is y
      const account2Address = account2.getAddress().toHex();
      console.log('User 2 address is', account2Address);
      let account2State = await client.getAccountState(account2Address);
      // expect(account2State.balance.eq(0)).toEqual(true)

    }, 30000);
  });
});