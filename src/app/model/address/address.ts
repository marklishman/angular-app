import { GeoLocation } from '../geo-location/geo-location';
import { AddressDto } from './address-dto';

export interface AddressData {
  readonly street: string;
  readonly suite: string;
  readonly city: string;
  readonly zipcode: string;
  readonly geo: GeoLocation;
}

export interface Address extends AddressData {}

export class Address {
  constructor(data: AddressData) {
    return Object.assign(this, data);
  }

  static fromDto(addressDto: AddressDto): Address {
    if (!addressDto) { return }
    const geo = GeoLocation.fromDto(addressDto.geo);
    const data = Object.assign(addressDto, { geo });
    return new Address(data);
  }
}
