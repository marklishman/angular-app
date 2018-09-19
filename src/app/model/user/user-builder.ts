import { User, UserData } from './user';
import { Address } from '../address/address';

export class UserBuilder {
  private userData = {} as UserData;

  constructor(userName: string, email: string) {
    // Mandatory values
    this
      .userName(userName)
      .email(email);
  }

  build(): User {
    if (!this.userData.userName) {
      throw new Error('missing user name');
    }
    if (!this.userData.email) {
      throw new Error('missing email');
    }
    return new User(this.userData);
  }

  id(id: number): UserBuilder {
    this.userData = Object.assign(this.userData, {id});
    return this;
  }

  userName(userName: string): UserBuilder {
    this.userData = Object.assign(this.userData, {userName});
    return this;
  }

  fullName(fullName: string): UserBuilder {
    this.userData = Object.assign(this.userData, {fullName});
    return this;
  }

  email(email: string): UserBuilder {
    this.userData = Object.assign(this.userData, {email});
    return this;
  }

  address(address: Address): UserBuilder {
    this.userData = Object.assign(this.userData, {address});
    return this;
  }

  phone(phone: string): UserBuilder {
    this.userData = Object.assign(this.userData, {phone});
    return this;
  }

  website(website: string): UserBuilder {
    this.userData = Object.assign(this.userData, {website});
    return this;
  }

  company(company: Address): UserBuilder {
    this.userData = Object.assign(this.userData, {company});
    return this;
  }
}
