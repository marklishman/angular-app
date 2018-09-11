import { UserHttpService } from './user-http.service';
import createSpyObj = jasmine.createSpyObj;
import { of } from 'rxjs';

import * as userFixture from '../../testing/data-fixtures/user-data-fixture';
import { UserService } from './user.service';

describe('UserService', () => {

  let userService: UserService;
  let userHttpService: UserHttpService;

  describe('getUserList$', () => {

    beforeEach(() => {

      userHttpService = createSpyObj<UserHttpService>({
        'getUserList$': of(userFixture.users)
      });

      userService = new UserService(userHttpService);
    });

    it('should get a list of users', () => {
      userService.getUserList$()
        .subscribe(
          actual => expect(actual).toBe(userFixture.users)
        );
    });
  });

});
