import { Address } from './address';
import { Company } from './company';

export interface UserData {
  readonly id: number;
  readonly userName: string;
  readonly fullName: string;
  readonly email: string;
  // readonly address: Address;
  readonly phone: string;
  readonly website: string;
  // readonly company: Company;
}

// tslint:disable-next-line:no-empty-interface
export interface User extends UserData {}

export class User {
  constructor(data: UserData) {
    return Object.assign(this, data);
  }
}
