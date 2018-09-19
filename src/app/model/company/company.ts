import { CompanyDto } from './company-dto';

export interface CompanyData {
  readonly name: string;
  readonly catchPhrase: string;
  readonly info: string;
}

// tslint:disable-next-line:no-empty-interface
export interface Company extends CompanyData {}

export class Company {
  constructor(data: CompanyData) {
    return Object.assign(this, data);
  }

  // TODO unit test
  static fromDto(companyDto: CompanyDto): Company {
    return new Company({
      name: companyDto.name,
      catchPhrase: companyDto.catchPhrase,
      info: companyDto.bs,
    });
  }
}
