import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserDto } from './dto/user-dto';
import { UserHttpService } from './user-http.service';
import { User } from '../../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // TODO convert DTO to model

  constructor(private userHttpService: UserHttpService) {
  }

  getUsers$(): Observable<User[]> {
    return this.userHttpService.getUsers$()
      .pipe(
        map(userDto => userDto as User[]),
      );
  }

  getUser$(userId: number): Observable<User> {
    return this.userHttpService.getUser$(userId)
      .pipe(
        map(userDto => userDto as User),
      );
  }

  saveUser(user: User): Observable<User> {
    return this.userHttpService.saveUser(user as UserDto)
      .pipe(
        map(userDto => userDto as User),
      );
  }

  deleteUser(userId: number): Observable<User> {
    return this.userHttpService.deleteUser(userId)
      .pipe(
        map(userDto => userDto as User),
      );
  }
}
