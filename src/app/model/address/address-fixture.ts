import { Address } from './address';
import { GeoLocation } from '../geo-location/geo-location';
import { AddressDto } from './address-dto';

export const firstAddressDto: AddressDto = {
  street: 'Kulas Light',
  suite: 'Apt. 556',
  city: 'Gwenborough',
  zipcode: '92998-3874',
  geo: {
    lat: '-37.3159',
    lng: '81.1496'
  }
};

export const secondAddressDto: AddressDto = {
  street: 'Victor Plains',
  suite: 'Suite 879',
  city: 'Wisokyburgh',
  zipcode: '90566-7771',
  geo: {
    lat: '-43.9509',
    lng: '-34.4618'
  }
};

export const firstAddress = new Address({
  street: 'Kulas Light',
  suite: 'Apt. 556',
  city: 'Gwenborough',
  zipcode: '92998-3874',
  geo: new GeoLocation({
    lat: -37.3159,
    lng: 81.1496
  })
});

export const secondAddress: Address = new Address({
  street: 'Victor Plains',
  suite: 'Suite 879',
  city: 'Wisokyburgh',
  zipcode: '90566-7771',
  geo: new GeoLocation({
    lat: -43.9509,
    lng: -34.4618
  })
});
