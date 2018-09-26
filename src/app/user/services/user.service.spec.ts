import { UserHttpService } from '../http/user-http.service';
import createSpyObj = jasmine.createSpyObj;
import { of } from 'rxjs';

import * as userFixture from '../../testing/data-fixtures/user-data-fixture';
import { UserService } from './user.service';

xdescribe('UserService', () => {

  const USER_ID = userFixture.firstUser.id;

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

  describe('getUser$', () => {

    beforeEach(() => {

      userHttpService = createSpyObj<UserHttpService>({
        'getUser$': of(userFixture.firstUserDto)
      });

      userService = new UserService(userHttpService);
    });

    it('should get a user', () => {
      userService.getUser$(USER_ID)
        .subscribe(
          actual => expect(actual).toBe(userFixture.firstUser)
        );
    });
  });


});
