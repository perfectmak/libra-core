import BigNumber from 'bignumber.js';
import { CursorBuffer } from '../common/CursorBuffer';
import { KeyPair } from '../crypto/EdDsa';
import { SHA3 } from 'sha3';
import Addresses from '../constants/Addresses';

export type AccountStates = AccountState[]

/**
 * Contains all the information relevant to a particular users accounts.
 * Beware of stale data though. Will implement refresh logic soon.
 * 
 * 
 */
export class AccountState {
  
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

  /**
   * Returns an empty AccountState
   */
  static default(address: string): AccountState {
    return new AccountState(
      new Uint8Array(Buffer.from(address, 'hex')),
      new BigNumber(0),
      new BigNumber(0),
      new BigNumber(0),
      new BigNumber(0)
    )
  }

  static from(bytes: Uint8Array): AccountState {
    const cursor = new CursorBuffer(bytes);

    const authenticationKeyLen = cursor.read32();
    const authenticationKey = cursor.readXBytes(authenticationKeyLen);
    const balance = cursor.read64();
    const receivedEventsCount = cursor.read64();
    const sentEventsCount = cursor.read64();
    const sequenceNumber = cursor.read64();

    return new AccountState(
      authenticationKey,
      balance,
      receivedEventsCount,
      sentEventsCount,
      sequenceNumber
    )
  }
}

export class Account {
  private _address?: AccountAddress;
  public readonly keyPair: KeyPair;

  constructor(keyPair: KeyPair) {
    this.keyPair = keyPair;
  }

  getAddress(): AccountAddress {
    if (this._address !== undefined) {
      return this._address;
    }

    const sha3 = new SHA3(256);
    sha3.update(Buffer.from(this.keyPair.getPublicKey()))
    this._address = new AccountAddress(new Uint8Array(sha3.digest()))
    return this._address;
  }
}

export class AccountAddress {
  private readonly _addressBytes: Uint8Array;

  static isValidString(addressHex: string): boolean {
    let length = new String(addressHex).replace(' ', '').length;
    return length === (Addresses.AddressLength * 2)
  }

  static isValidBytes(addressBytes: Uint8Array): boolean {
    return addressBytes.length === Addresses.AddressLength;
  }

  constructor(hash: Uint8Array) {
    if (!AccountAddress.isValidBytes(hash)) {
      throw new Error(`The address is of invalid length [${hash.length}]`)
    }
    this._addressBytes = hash.slice(0, Addresses.AddressLength);
  }

  toHex(): string {
    return Buffer.from(this._addressBytes).toString('hex');
  }
}