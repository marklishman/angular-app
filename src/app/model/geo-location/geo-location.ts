import { GeoLocationDto } from './geo-location-dto';

export interface GeoLocationData {
  readonly lat: string;
  readonly lng: string;
}

// tslint:disable-next-line:no-empty-interface
export interface GeoLocation extends GeoLocationData {}

export class GeoLocation {
  constructor(data: GeoLocationData) {
    return Object.assign(this, data);
  }

  // TODO unit test
  static fromDto(geoLocationDto: GeoLocationDto): GeoLocation {
    return new GeoLocation(geoLocationDto);
  }
}
