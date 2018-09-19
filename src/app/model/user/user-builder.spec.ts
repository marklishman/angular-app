import { User, UserData } from './user';
import objectContaining = jasmine.objectContaining;

describe('UserBuilder', () => {

  it('should build with the correct values', () => {
    const user = User
      .builder('bobby', 'bobby@email.com')
      .id(123)
      .fullName('Bobby Smith')
      .phone('123456789')
      .website('test.bobby.com')
      .build();

    const expected = {
      id: 123,
      userName: 'bobby',
      fullName: 'Bobby Smith',
      email: 'bobby@email.com',
      phone: '123456789',
      website: 'test.bobby.com',
    } as UserData;

    expect(user).toEqual(objectContaining(expected));
  });

  it('should throw and error if user name is missing', () => {
    const userBuilder = User
      .builder(null, 'bobby@email.com')
      .id(123)
      .fullName('Bobby Smith')
      .phone('123456789')
      .website('test.bobby.com');

    expect(() => userBuilder.build()).toThrow(new Error('missing user name'));

  });

  it('should throw and error if email is missing', () => {
    const userBuilder = User
      .builder('bobby', undefined)
      .id(123)
      .fullName('Bobby Smith')
      .phone('123456789')
      .website('test.bobby.com');

    expect(() => userBuilder.build()).toThrow(new Error('missing email'));

  });

});
