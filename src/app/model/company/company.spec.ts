import { Company } from './company';
import * as companyFixture from '../../model/company/company-fixture';

describe('Company', () => {
  describe('fromDto', () => {

    it('should map company data and rename bs to info', () => {
      const company = Company.fromDto(companyFixture.firstCompanyDto);

      expect(company.name).toEqual(companyFixture.firstCompanyDto.name);
      expect(company.catchPhrase).toEqual(companyFixture.firstCompanyDto.catchPhrase);
      expect(company.info).toEqual(companyFixture.firstCompanyDto.bs);
    });

    it('should return undefined if DTO is undefined', () => {
      expect(Company.fromDto(undefined)).toBeUndefined();
    });

  });
});
