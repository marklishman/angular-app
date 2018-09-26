import { Address } from '../address/address';
import { Company } from '../company/company';
import { UserBuilder } from './user-builder';
import { UserDto } from './user-dto';

export interface UserData {
  readonly id: number;
  readonly userName: string;
  readonly fullName: string;
  readonly email: string;
  readonly address: Address;
  readonly phone: string;
  readonly website: string;
  readonly company: Company;
}

// tslint:disable-next-line:no-empty-interface
export interface User extends UserData {}

export class User {
  constructor(data: UserData) {
    return Object.assign(this, data);
  }

  static builder(userName: string, email: string): UserBuilder {
    return new UserBuilder(userName, email);
  }

  // TODO unit test
  static fromDto(userDto: UserDto): User {
    // Drop 'username' and 'name'
    const {username, name, ...keep} = userDto;

    // Rename 'username' and 'name' to 'userName' and 'fullName'
    const rename = {
      userName: userDto.username,
      fullName: userDto.name
    };

    // Instantiate 'address' and 'company' as objects
    const nested = {
      address: Address.fromDto(userDto.address),
      company: Company.fromDto(userDto.company)
    };

    const data = Object.assign(
      {},
      keep,
      rename,
      nested
    );

    return new User(data);
  }

  // TODO unit test
  toDto(): UserDto {
    return {
      id: this.id,
      name: this.fullName,
      username: this.userName,
      email: this.email,
      phone: this.phone,
      website: this.website
    } as UserDto;
  }
}

