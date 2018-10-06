import { Address } from './address';
import * as addressFixture from '../../model/address/address-fixture';

describe('Address', () => {
  describe('fromDto', () => {

    it('should map geo data', () => {
      const address = Address.fromDto(addressFixture.firstAddressDto);

      expect(address.geo).toEqual(addressFixture.firstAddress.geo);
    });

    it('should map address data', () => {
      const address = Address.fromDto(addressFixture.firstAddressDto);

      expect(address.street).toEqual(addressFixture.firstAddressDto.street);
      expect(address.suite).toEqual(addressFixture.firstAddressDto.suite);
      expect(address.city).toEqual(addressFixture.firstAddressDto.city);
      expect(address.zipcode).toEqual(addressFixture.firstAddressDto.zipcode);
    });

    it('should return undefined if DTO is undefined', () => {
      expect(Address.fromDto(undefined)).toBeUndefined();
    });

  });
});
