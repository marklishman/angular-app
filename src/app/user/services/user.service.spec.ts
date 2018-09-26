import { UserHttpService } from '../http/user-http.service';
import { of } from 'rxjs';

import * as userFixture from '../../model/user/user-fixture';
import { UserService } from './user.service';
import createSpyObj = jasmine.createSpyObj;
import objectContaining = jasmine.objectContaining;

describe('UserService', () => {

  // TODO unit test error handling

  const USER_ID = userFixture.firstUser.id;

  let userService: UserService;
  let userHttpService: UserHttpService;

  describe('getUserList$', () => {

    beforeEach(() => {
      userHttpService = createSpyObj<UserHttpService>({
        'getList$': of(userFixture.userDtos)
      });
      userService = new UserService(userHttpService);
    });

    it('should get a list of users and convert the DTOs', () => {
      userService.getUserList$()
        .subscribe(
          actual => expect(actual).toEqual(userFixture.users)

        );
    });
  });

  describe('getUser$', () => {

    beforeEach(() => {
      userHttpService = createSpyObj<UserHttpService>({
        'getById$': of(userFixture.firstUserDto)
      });
      userService = new UserService(userHttpService);
    });

    it('should get a user and convert the DTO', () => {
      userService.getUser$(USER_ID)
        .subscribe(
          actual => expect(actual).toEqual(userFixture.firstUser)
        );
    });
  });


});
