import { UserHttpService } from '../http/user-http.service';
import { of } from 'rxjs';

import * as userFixture from '../../model/user/user-fixture';
import { UserService } from './user.service';
import createSpyObj = jasmine.createSpyObj;

describe('UserService', () => {

  const FIRST_USER_ID = userFixture.firstUser.id;

  let userService: UserService;
  let userHttpService: UserHttpService;

  beforeEach(() => {
    userHttpService = createSpyObj<UserHttpService>('userHttpService', {
      'getList$': of(userFixture.userDtos),
      'getById$': of(userFixture.firstUserDto),
      'save$': of(userFixture.firstUserDto),
      'delete$': of(userFixture.firstUserDto)
    });
    userService = new UserService(userHttpService);
  });

  describe('getUserList$', () => {
    it('should get a list of users and convert the DTOs', () => {
      userService.getUserList$()
        .subscribe(
          actual => {
            expect(userHttpService.getList$).toHaveBeenCalled();
            expect(actual).toEqual(userFixture.users);
          }
        );
    });
  });

  describe('getUser$', () => {
    it('should get a user and convert the DTO', () => {
      userService.getUser$(FIRST_USER_ID)
        .subscribe(
          actual => {
            expect(userHttpService.getById$).toHaveBeenCalledWith(FIRST_USER_ID);
            expect(actual).toEqual(userFixture.firstUser);
          }
        );
    });
  });

  describe('saveUser$', () => {
    it('should save the user and convert the returned DTO', () => {
      userService.saveUser$(userFixture.firstUser)
        .subscribe(
          actual => {
            const {address, company, ...userDto} = userFixture.firstUserDto;
            expect(userHttpService.save$).toHaveBeenCalledWith(userDto);
            expect(actual).toEqual(userFixture.firstUser);
          }
        );
    });
  });

  describe('deleteUser$', () => {
    it('should delete the user for the id and convert the returned DTO', () => {
      userService.deleteUser$(FIRST_USER_ID)
        .subscribe(
          actual => {
            expect(userHttpService.delete$).toHaveBeenCalledWith(FIRST_USER_ID);
            expect(actual).toEqual(userFixture.firstUser);
          }
        );
    });
  });

});
