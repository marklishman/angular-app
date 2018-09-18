import { GeoLocation } from './geo-location';

export interface AddressData {
  readonly street: string;
  readonly suite: string;
  readonly city: string;
  readonly zipcode: string;
  readonly geo: GeoLocation;
}

// tslint:disable-next-line:no-empty-interface
export interface Address extends AddressData {}

export class Address {
  constructor(data: AddressData) {
    return Object.assign(this, data);
  }
  test() {
    console.log('this is a test');
  }
}
