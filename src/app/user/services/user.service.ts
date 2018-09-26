import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserHttpService } from '../http/user-http.service';
import { User } from '../../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userHttpService: UserHttpService) {
  }

  getUserList$(): Observable<User[]> {
    return this.userHttpService.getList$()
      .pipe(
        map(userDtos => userDtos.map(
          userDto => User.fromDto(userDto)
        )),
      );
  }

  getUser$(userId: number): Observable<User> {
    return this.userHttpService.getById$(userId)
      .pipe(
        map(userDto => User.fromDto(userDto))
      );
  }

  saveUser$(user: User): Observable<User> {
    return this.userHttpService.save$(user.toDto())
      .pipe(
        map(userDto => User.fromDto(userDto))
      );
  }

  deleteUser$(userId: number): Observable<User> {
    return this.userHttpService.delete$(userId)
      .pipe(
        map(userDto => User.fromDto(userDto))
      );
  }

}
