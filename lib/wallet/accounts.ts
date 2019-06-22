import BigNumber from 'bignumber.js';
import { CursorBuffer } from '../common/CursorBuffer';

export type AccountResources = AccountResource[]

/**
 * Contains all the information relevant to a particular users accounts.
 * Beware of stale data though. Will implement refresh logic soon.
 * 
 * 
 */
export class AccountResource {
  public readonly authenticationKey: Uint8Array;
  public readonly balance: BigNumber;
  public readonly receivedEventsCount: BigNumber;
  public readonly sentEventsCount: BigNumber;
  public readonly sequenceNumber: BigNumber;

  private constructor(
    authenticationKey: Uint8Array,
    balance: BigNumber,
    receivedEventsCount: BigNumber,
    sentEventsCount: BigNumber,
    sequenceNumber: BigNumber
  ) {
    this.balance = balance;
    this.sequenceNumber = sequenceNumber;
    this.authenticationKey = authenticationKey;
    this.sentEventsCount = sentEventsCount;
    this.receivedEventsCount = receivedEventsCount;
  }

  static from(bytes: Uint8Array): AccountResource {
    const cursor = new CursorBuffer(bytes);

    const authenticationKeyLen = cursor.read32();
    const authenticationKey = cursor.readXBytes(authenticationKeyLen);
    const balance = cursor.read64();
    const receivedEventsCount = cursor.read64();
    const sentEventsCount = cursor.read64();
    const sequenceNumber = cursor.read64();

    return new AccountResource(
      authenticationKey,
      balance,
      receivedEventsCount,
      sentEventsCount,
      sequenceNumber
    )
  }
}