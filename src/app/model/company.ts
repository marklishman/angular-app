
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
  test() {
    console.log('this is a test');
  }
}
