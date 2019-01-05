import { GeoLocationDto } from './geo-location-dto';

export interface GeoLocationData {
  readonly lat: number;
  readonly lng: number;
}

export interface GeoLocation extends GeoLocationData {}

export class GeoLocation {
  constructor(data: GeoLocationData) {
    return Object.assign(this, data);
  }

  static fromDto(geoLocationDto: GeoLocationDto): GeoLocation {
    if (!geoLocationDto) { return }
    return new GeoLocation({
      //  DTO converter: change the data type
      lat: parseFloat(geoLocationDto.lat),
      lng: parseFloat(geoLocationDto.lng)
    });
  }
}
