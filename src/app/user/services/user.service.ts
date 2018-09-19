import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserHttpService } from '../http/user-http.service';
import { UserDto } from '../../model/user/user-dto';
import { Company } from '../../model/company/company';
import { CompanyDto } from '../../model/company/company-dto';
import { Address } from '../../model/address/address';
import { User } from '../../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // TODO unit test

  constructor(private userHttpService: UserHttpService) {
  }

  getUserList$(): Observable<User[]> {
    return this.userHttpService.getUserList$()
      .pipe(
        map(userDtos => userDtos.map(
          userDto => this.mapDtoToUser(userDto)
        )),
      );
  }

  getUser$(userId: number): Observable<User> {
    return this.userHttpService.getUser$(userId)
      .pipe(
        map(userDto => this.mapDtoToUser(userDto)),
      );
  }

  saveUser$(user: User): Observable<User> {
    return this.userHttpService.saveUser$(this.mapUserToDto(user))
      .pipe(
        map(userDto => this.mapDtoToUser(userDto))
      );
  }

  deleteUser$(userId: number): Observable<User> {
    return this.userHttpService.deleteUser$(userId)
      .pipe(
        map(userDto => this.mapDtoToUser(userDto))
      );
  }

  // TODO use Object Builders
  // https://medium.com/@ezequiel/immutability-and-builders-with-typescript-b69a51c94e8c

  private mapDtoToUser(userDto: UserDto): User {

    // Drop 'username' and 'name'
    const {username, name, ...keep} = userDto;

    // Rename 'username' and 'name' to 'userName' and 'fullName'
    const rename = {
      userName: userDto.username,
      fullName: userDto.name
    };

    // Instantiate 'address' and 'company' as objects
    const nested = {
      address: new Address(userDto.address),
      company: this.mapDtoToCompany(userDto.company)
    };

    const data = Object.assign(
      {},
      keep,
      rename,
      nested
    );

    return new User(data);
  }

  private mapDtoToCompany(companyDto: CompanyDto): Company {
    return new Company({
      name: companyDto.name,
      catchPhrase: companyDto.catchPhrase,
      info: companyDto.bs,
    });
  }

  private mapUserToDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.fullName,
      username: user.userName,
      email: user.email,
      phone: user.phone,
      website: user.website
    } as UserDto;
  }
}
