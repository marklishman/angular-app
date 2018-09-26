import { GeoLocation } from './geo-location';
import * as addressFixture from '../../model/address/address-fixture';

describe('GeoLocation', () => {
  describe('fromDto', () => {

    it('should convert lat, lng strings to numbers', () => {
      const geoDto = addressFixture.firstAddressDto.geo;
      const geo = GeoLocation.fromDto(geoDto);

      expect(geo.lat).toEqual(-37.3159);
      expect(geo.lng).toEqual(81.1496);
    });

  });
});
