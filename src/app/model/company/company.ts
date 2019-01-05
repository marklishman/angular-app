import { CompanyDto } from './company-dto';

export interface CompanyData {
  readonly name: string;
  readonly catchPhrase: string;
  readonly bs: string;
}

export interface Company extends CompanyData {}

export class Company {
  constructor(data: CompanyData) {
    return Object.assign(this, data);
  }

  static fromDto(companyDto: CompanyDto): Company {
    if (!companyDto) { return }
    return new Company(companyDto);
  }
}
