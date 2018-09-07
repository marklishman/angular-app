import { UserHttpService } from './user-http.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import createSpyObj = jasmine.createSpyObj;

import * as userFixture from '../../testing/data-fixtures/user-data-fixture';

describe('UserHttpService', () => {

  let userHttpService: UserHttpService;
  let httpClient: HttpClient;

  describe('getUsers$', () => {

    beforeEach(() => {

      httpClient = createSpyObj<HttpClient>({
        'get': of(userFixture.userDtos)
      });

      userHttpService = new UserHttpService(httpClient);
    });

    it('should get a list of users', () => {
      userHttpService.getUsers$()
        .subscribe(
          actual => {
            expect(actual).toBe(userFixture.userDtos);
          }
        );
    });
  });

});
