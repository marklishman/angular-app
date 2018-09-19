import { Address } from '../../model/address/address';
import { Company } from '../../model/company/company';
import { GeoLocation } from '../../model/geo-location/geo-location';
import { UserDto } from '../../model/user/user-dto';
import { User } from '../../model/user/user';

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

export const firstUser = new User({
  id: 1,
  userName: 'Bret',
  fullName: 'Leanne Graham',
  email: 'Sincere@april.biz',
  address: new Address({
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: new GeoLocation(
      '-37.3159',
      '81.1496'
    )
  }),
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: new Company({
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    info: 'harness real-time e-markets'
  })
});

export const secondUser: User = new User({
    id: 2,
    userName: 'Antonette',
    fullName: 'Ervin Howell',
    email: 'Shanna@melissa.tv',
    address: new Address({
      street: 'Victor Plains',
      suite: 'Suite 879',
      city: 'Wisokyburgh',
      zipcode: '90566-7771',
      geo: new GeoLocation(
      '-43.9509',
      '-34.4618'
    )
  }),
  phone: '010-692-6593 x09125',
  website: 'anastasia.net',
  company: new Company({
    name: 'Deckow-Crist',
    catchPhrase: 'Proactive didactic contingency',
    info: 'synergize scalable supply-chains'
  })
});

export const users: User[] = [
  firstUser,
  secondUser
];
