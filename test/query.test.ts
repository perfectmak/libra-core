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

      // ensure its balance is 0
      const account1Address = account1.getAddress().toHex();
      console.log('User 1 address is', account1Address);
      const { balance } = await client.getAccountState(account1Address);
      expect(balance.eq(0)).toEqual(true)

      // mint x amount
      // ensure its balance is x amount

      // transfer y amount to new account
      // ensure new account balance is y
      
      // const accountStates = await client.getAccountState(
      //   [
      //     '3fa51e41e73012fdace736ba342898dfbc976dc884cddd43650b478eb3ba5a10',
      //     '2716b9fd6c00ec921b1cae01ee72255471caa3717f01374af371f3e54194ffa5'
      // ]);
    });
  });
});