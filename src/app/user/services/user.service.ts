import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserHttpService } from './user-http.service';
import { User } from '../../model/user';
import { UserDto } from './dto/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  private mapDtoToUser(userDto: UserDto): User {
    return new User({
      id: userDto.id,
      userName: userDto.username,
      fullName: userDto.name,
      email: userDto.email,
      phone: userDto.phone,
      website: userDto.website
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
