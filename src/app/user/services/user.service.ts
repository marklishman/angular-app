import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserHttpService } from '../http/user-http.service';
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
          userDto => User.fromDto(userDto)
        )),
      );
  }

  getUser$(userId: number): Observable<User> {
    return this.userHttpService.getUser$(userId)
      .pipe(
        map(userDto => User.fromDto(userDto))
      );
  }

  saveUser$(user: User): Observable<User> {
    return this.userHttpService.saveUser$(user.toDto())
      .pipe(
        map(userDto => User.fromDto(userDto))
      );
  }

  deleteUser$(userId: number): Observable<User> {
    return this.userHttpService.deleteUser$(userId)
      .pipe(
        map(userDto => User.fromDto(userDto))
      );
  }

}
