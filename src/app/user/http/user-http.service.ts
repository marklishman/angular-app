import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserDto } from '../../model/user/user-dto';
import { HttpCrudService } from '../../common/http/http-crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService extends HttpCrudService<UserDto, number> {

  constructor(httpClient: HttpClient) {
    super('users', httpClient);
  }
}
