import { User } from '../../model/user';
import { Address } from '../../model/address';
import { Company } from '../../model/company';
import { GeoLocation } from '../../model/geo-location';

export const users: User[] = [
  {
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
  },
  {
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
  },
];

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
