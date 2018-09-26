import { GeoLocationDto } from '../geo-location/geo-location-dto';

export interface AddressDto {
  readonly street: string;
  readonly suite: string;
  readonly city: string;
  readonly zipcode: string;
  readonly geo: GeoLocationDto;
}
