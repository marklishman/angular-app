import { UserHttpService } from './user-http.service';
import { HttpClient } from '@angular/common/http';
import createSpyObj = jasmine.createSpyObj;
import { of } from 'rxjs';

import * as userFixture from '../../testing/user-fixture';

describe('UserHttpService', () => {

  let userService: UserHttpService;
  let httpClient: HttpClient;

  describe('getUsers$', () => {

    beforeEach(() => {

      httpClient = createSpyObj<HttpClient>({
        'get': of(userFixture.users)
      });

      userService = new UserHttpService(httpClient);
    });

    it('should get a list of users', () => {
      userService.getUsers$()
        .subscribe(
          actual => expect(actual).toBe(userFixture.users)
        );
    });
  });

});
