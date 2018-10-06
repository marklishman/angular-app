import { User } from './user';
import * as userFixture from '../../model/user/user-fixture';
import { UserDto } from './user-dto';

describe('User', () => {

  let user: User;

  describe('fromDto', () => {

    describe('full DTO object', () => {

      beforeEach(() => {
        user = User.fromDto(userFixture.firstUserDto);
      });

      it('should map user data with same property names', () => {
        expect(user.id).toEqual(userFixture.firstUserDto.id);
        expect(user.email).toEqual(userFixture.firstUserDto.email);
        expect(user.phone).toEqual(userFixture.firstUserDto.phone);
        expect(user.website).toEqual(userFixture.firstUserDto.website);
      });

      it('should remove unwanted property names', () => {
        expect((<any>user).username).toBeUndefined();
        expect((<any>user).name).toBeUndefined();
      });

      it('should rename property names', () => {
        expect(user.userName).toBe(userFixture.firstUserDto.username);
        expect(user.fullName).toBe(userFixture.firstUserDto.name);
      });

      it('should create real objects for nested objects if they exist', () => {
        expect(user.address).toEqual(userFixture.firstUser.address);
        expect(user.company).toEqual(userFixture.firstUser.company);
      });
    });

    it('should not include nested objects if they do not exist', () => {

      user = User.fromDto(userFixture.partialUserDto);

      expect(user.address).toBeUndefined();
      expect(user.company).toBeUndefined();
    });


    it('should return undefined if DTO is undefined', () => {
      expect(User.fromDto(undefined)).toBeUndefined();
    });
  });

  describe('toDto', () => {

    let userDto: UserDto;

    beforeEach(() => {
      userDto = user.toDto();
    });

    it('should convert the required properties', () => {
      expect(userDto.id).toBe(userFixture.firstUser.id);
      expect(userDto.name).toBe(userFixture.firstUser.fullName);
      expect(userDto.username).toBe(userFixture.firstUser.userName);
      expect(userDto.email).toBe(userFixture.firstUser.email);
      expect(userDto.phone).toBe(userFixture.firstUser.phone);
      expect(userDto.website).toBe(userFixture.firstUser.website);

      // or this

      const {address, company, ...expectedUserDto} = userFixture.firstUserDto;
      expect(userDto).toEqual(expectedUserDto as UserDto);

    });

    it('should not include address and company', () => {
      expect(userDto.address).toBeUndefined();
      expect(userDto.company).toBeUndefined();
    });
  });
});
