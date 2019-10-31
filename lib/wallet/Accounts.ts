import BigNumber from 'bignumber.js';
import { SHA3 } from 'sha3';
import { CursorBuffer } from '../common/CursorBuffer';
import Addresses from '../constants/Addresses';
import { KeyPair } from '../crypto/Eddsa';
import { EventHandle } from './Events';

export type AccountStates = AccountState[];

/**
 * Contains all the information relevant to a particular users accounts.
 * Beware of stale data though. Will implement refresh logic soon.
 *
 *
 */
export class AccountState {
  /**
   * Returns an empty AccountState
   */
  public static default(address: string): AccountState {
    return new AccountState(
      new Uint8Array(Buffer.from(address, 'hex')),
      new BigNumber(0),
      EventHandle.default(),
      EventHandle.default(),
      new BigNumber(0),
      true
    );
  }

  public static fromBytes(bytes: Uint8Array): AccountState {
    const cursor = new CursorBuffer(bytes);

    const authenticationKeyLen = cursor.read32();
    const authenticationKey = cursor.readXBytes(authenticationKeyLen);
    const balance = cursor.read64();
    const delegatedWithdrawalCapability = cursor.readBool();
    const receivedEventsCount = cursor.read64();
    const receivedEventsKeyLen = cursor.read32();
    const receivedEventsKey = cursor.readXBytes(receivedEventsKeyLen);
    const sentEventsCount = cursor.read64();
    const sentEventsKeyLen = cursor.read32();
    const sentEventsKey = cursor.readXBytes(sentEventsKeyLen);
    const sequenceNumber = cursor.read64();

    return new AccountState(
      authenticationKey,
      balance,
      new EventHandle(receivedEventsKey,receivedEventsCount),
      new EventHandle(sentEventsKey,sentEventsCount),
      sequenceNumber,
      delegatedWithdrawalCapability);
  }
  public readonly authenticationKey: Uint8Array;
  public readonly balance: BigNumber;
  public readonly receivedEvents: EventHandle;
  public readonly sentEvents: EventHandle;
  public readonly sequenceNumber: BigNumber;
  public readonly delegatedWithdrawalCapability: boolean;

  private constructor(
    authenticationKey: Uint8Array,
    balance: BigNumber,
    receivedEvents: EventHandle,
    sentEvents: EventHandle,
    sequenceNumber: BigNumber,
    delegatedWithdrawalCapability: boolean,
  ) {
    this.balance = balance;
    this.sequenceNumber = sequenceNumber;
    this.authenticationKey = authenticationKey;
    this.sentEvents = sentEvents;
    this.receivedEvents = receivedEvents;
    this.delegatedWithdrawalCapability = delegatedWithdrawalCapability;
  }
}

export class Account {
  public static fromSecretKeyBytes(secretKeyBytes: Uint8Array): Account {
    return new Account(KeyPair.fromSecretKey(secretKeyBytes));
  }

  public static fromSecretKey(secretKeyHex: string): Account {
    const keyBytes = new Uint8Array(Buffer.from(secretKeyHex, 'hex'));
    return Account.fromSecretKeyBytes(keyBytes);
  }

  public readonly keyPair: KeyPair;
  private address?: AccountAddress;

  constructor(keyPair: KeyPair) {
    this.keyPair = keyPair;
  }

  public getAddress(): AccountAddress {
    if (this.address !== undefined) {
      return this.address;
    }

    const sha3 = new SHA3(256);
    sha3.update(Buffer.from(this.keyPair.getPublicKey()));
    this.address = new AccountAddress(new Uint8Array(sha3.digest()));
    return this.address;
  }
}

export type AccountAddressLike = AccountAddress | string | Uint8Array;
export class InvalidAccountAddressError extends Error {
  constructor(invalidLength: number | string) {
    super(`The address is of invalid length [${invalidLength}]`);
  }
}

/**
 * Represents a validated Account address
 *
 */
export class AccountAddress {
  public static isValidString(addressHex: string): boolean {
    const length = String(addressHex).replace(' ', '').length;
    return length === Addresses.AddressLength * 2;
  }

  public static isValidBytes(addressBytes: Uint8Array): boolean {
    return addressBytes.length === Addresses.AddressLength;
  }

  public static default(): AccountAddress {
    return new AccountAddress(new Uint8Array(Buffer.from(Addresses.AssociationAddress, 'hex')));
  }
  private readonly addressBytes: Uint8Array;

  constructor(addressOrHash: AccountAddressLike) {
    if (typeof addressOrHash === 'string') {
      this.addressBytes = Uint8Array.from(Buffer.from(addressOrHash, 'hex'));
    } else if (addressOrHash instanceof AccountAddress) {
      this.addressBytes = addressOrHash.addressBytes;
    } else {
      // assume it a byte array
      this.addressBytes = addressOrHash.slice(0, Addresses.AddressLength);
    }

    if (!AccountAddress.isValidBytes(this.addressBytes)) {
      throw new InvalidAccountAddressError(this.addressBytes.length);
    }
  }

  public isDefault(): boolean {
    return AccountAddress.default().toHex() === this.toHex();
  }

  public toBytes(): Uint8Array {
    return this.addressBytes;
  }

  public toHex(): string {
    return Buffer.from(this.addressBytes).toString('hex');
  }

  /**
   * Alias for toHex()
   */
  public toString(): string {
    return this.toHex();
  }
}
