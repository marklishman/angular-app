import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserDto } from '../../model/user/user-dto';
import { DefaultHttpCrudService } from '../../common/http/default-http-crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService extends DefaultHttpCrudService<UserDto, number> {

  constructor(httpClient: HttpClient) {
    super('users', httpClient);
  }
}
