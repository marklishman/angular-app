import { GeoLocation } from './geo-location';

export class Address {
  constructor(
    public readonly street: string,
    public readonly suite: string,
    public readonly city: string,
    public readonly zipcode: string,
    public readonly geoLocation: GeoLocation
  ) {}
}
