import { GeoLocationDto } from './geo-location-dto';

export interface AddressDto {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocationDto;
}
