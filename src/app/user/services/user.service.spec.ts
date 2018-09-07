import { UserHttpService } from './user-http.service';
import createSpyObj = jasmine.createSpyObj;
import { of } from 'rxjs';

import * as userFixture from '../../testing/data-fixtures/user-data-fixture';
import { UserService } from './user.service';

describe('UserService', () => {

  let userService: UserService;
  let userHttpService: UserHttpService;

  describe('getUsers$', () => {

    beforeEach(() => {

      userHttpService = createSpyObj<UserHttpService>({
        'getUsers$': of(userFixture.users)
      });

      userService = new UserService(userHttpService);
    });

    it('should get a list of users', () => {
      userService.getUsers$()
        .subscribe(
          actual => expect(actual).toBe(userFixture.users)
        );
    });
  });

});
