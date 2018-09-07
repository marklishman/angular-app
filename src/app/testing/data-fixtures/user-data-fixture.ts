import { Address } from '../../model/address';
import { Company } from '../../model/company';
import { GeoLocation } from '../../model/geo-location';
import { UserDto } from '../../user/services/dto/user-dto';
import { User } from '../../model/user';

// UserDto

export const firstUserDto: UserDto = {
    'id': 1,
    'name': 'Leanne Graham',
    'username': 'Bret',
    'email': 'Sincere@april.biz',
    'address': {
      'street': 'Kulas Light',
      'suite': 'Apt. 556',
      'city': 'Gwenborough',
      'zipcode': '92998-3874',
      'geo': {
        'lat': '-37.3159',
        'lng': '81.1496'
      }
    },
    'phone': '1-770-736-8031 x56442',
    'website': 'hildegard.org',
    'company': {
      'name': 'Romaguera-Crona',
      'catchPhrase': 'Multi-layered client-server neural-net',
      'bs': 'harness real-time e-markets'
    }
  };

export const secondUserDto: UserDto = {
    'id': 2,
    'name': 'Ervin Howell',
    'username': 'Antonette',
    'email': 'Shanna@melissa.tv',
    'address': {
      'street': 'Victor Plains',
      'suite': 'Suite 879',
      'city': 'Wisokyburgh',
      'zipcode': '90566-7771',
      'geo': {
        'lat': '-43.9509',
        'lng': '-34.4618'
      }
    },
    'phone': '010-692-6593 x09125',
    'website': 'anastasia.net',
    'company': {
      'name': 'Deckow-Crist',
      'catchPhrase': 'Proactive didactic contingency',
      'bs': 'synergize scalable supply-chains'
    }
  };

export const userDtos: UserDto[] = [
  firstUserDto,
  secondUserDto
];

// User

export const firstUser = new User(
  1,
  'Leanne Graham',
  'Bret',
  'Sincere@april.biz',
  new Address(
    'Kulas Light',
  'Apt. 556',
  'Gwenborough',
    '92998-3874',
    new GeoLocation(
      '-37.3159',
      '81.1496'
    )
  ),
  '1-770-736-8031 x56442',
  'hildegard.org',
  new Company(
    'Romaguera-Crona',
  'Multi-layered client-server neural-net',
  'harness real-time e-markets'
  )
);

export const secondUser: User = new User(
  2,
  'Ervin Howell',
  'Antonette',
  'Shanna@melissa.tv',
  new Address (
    'Victor Plains',
    'Suite 879',
    'Wisokyburgh',
    '90566-7771',
    new GeoLocation (
      '-43.9509',
      '-34.4618'
    )
  ),
  '010-692-6593 x09125',
  'anastasia.net',
  new Company(
    'Deckow-Crist',
    'Proactive didactic contingency',
    'synergize scalable supply-chains'
  )
);

export const users: User[] = [
  firstUser,
  secondUser
];
