import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;
import { of } from 'rxjs';

import * as userFixture from '../../testing/user-fixture';

describe('UserService', () => {

  let userService: UserService;
  let httpClient: HttpClient;

  describe('getUsers$', () => {

    beforeEach(() => {

      // TODO use mock HTTP client?
      httpClient = createSpyObj<HttpClient>({
        'get': of(userFixture.users)
      });

      userService = new UserService(httpClient);
    });

    it('should get a list of users', () => {
      userService.getUsers$()
        .subscribe(
          actual => expect(actual).toBe(userFixture.users)
        );
    });
  });

});
