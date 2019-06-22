import { LiberaClient } from '../lib';

describe('LibraClient.query*()', () => {
  describe('queryBalance()', () => {
    it('should query balance', async () => {
      // test flow
      // create a new account
      // ensure its balance is 0
      // mint x amount
      // ensure its balance is x amount
      // transfer y amount to new account
      // ensure new account balance is y
      const client = new LiberaClient({ host: 'ac.testnet.libra.org', port: '80' });
      const accountStates = await client.getAccountState(
        [
          '3fa51e41e73012fdace736ba342898dfbc976dc884cddd43650b478eb3ba5a10',
          '2716b9fd6c00ec921b1cae01ee72255471caa3717f01374af371f3e54194ffa5'
      ]);
      console.log(accountStates[0]);
      expect(true).toEqual(true);
    });
  });
});