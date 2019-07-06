import { LibraClient, LibraNetwork, LibraWallet } from '../lib';
import {AdmissionControlStatus} from "../lib/__generated__/admission_control_pb";

describe('LibraClient.query*()', () => {
  describe('queryBalance()', () => {
    it('should query balance', async () => {
      const client = new LibraClient({ network: LibraNetwork.Testnet });
      const wallet = new LibraWallet({
        mnemonic:
          // 'upgrade salt toy stable drop paddle service supply display enhance spin polar rice convince exile laundry bounce reopen believe elevator craft display genre pink',
         'lend arm arm addict trust release grid unlock exhibit surround deliver front link bean night dry tuna pledge expect net ankle process mammal great',
        // 'bus noble spring fox sound donkey shell issue virtual subway library vocal during sunny rent twenty issue profit raccoon valid luxury clay place talk',

      });

      // TEST ACCOUNT CREATION
      const account1 = wallet.newAccount();
      const account1Address = account1.getAddress().toHex();
      console.log('User 1 address is', account1Address);
      // let account1State = await client.getAccountState(account1Address);

      const account2 = wallet.newAccount();
      const account2Address = account2.getAddress().toHex();
      console.log('User 2 address is', account2Address);
      const account2State = await client.getAccountState(account2Address);

      // TEST MINITNG xAmount
      // const xAmount = 20e6;
      // await client.mintWithFaucetService(account1Address, xAmount);
      // const newAccount1State = await client.getAccountState(account1Address);
      // ensure its balance is +xAmount
      // expect(newAccount1State.balance.toString(10)).toEqual(account1State.balance.plus(xAmount).toString(10));

      // TEST TRANSFER TRANSACTION OF yAmount
      // transfer y amount to new account
      const yAmount = 1e6;
      const response = await client.transferCoins(account1, account2Address, yAmount);
      expect(response.getAcStatus()).toEqual(AdmissionControlStatus.ACCEPTED);
      const newAccount2State = await client.getAccountState(account2Address);
      // ensure new account balance is +yAmount
      expect(newAccount2State.balance.toString(10)).toEqual(account2State.balance.plus(yAmount).toString(10));
    }, 3000000);

  });
});
