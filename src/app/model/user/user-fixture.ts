import { UserDto } from './user-dto';
import { User } from './user';
import * as companyFixture from '../../model/company/company-fixture';
import * as addressFixture from '../../model/address/address-fixture';

export const firstUserDto: UserDto = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: addressFixture.firstAddressDto,
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: companyFixture.firstCompanyDto
};

export const secondUserDto: UserDto = {
  id: 2,
  name: 'Ervin Howell',
  username: 'Antonette',
  email: 'Shanna@melissa.tv',
  address: addressFixture.secondAddressDto,
  phone: '010-692-6593 x09125',
  website: 'anastasia.net',
  company: companyFixture.secondCompanyDto
};

export const userDtos: UserDto[] = [
  firstUserDto,
  secondUserDto
];

export const firstUser = new User({
  id: 1,
  email: 'Sincere@april.biz',
  address: addressFixture.firstAddress,
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: companyFixture.firstCompany,
  userName: 'Bret',
  fullName: 'Leanne Graham',
});

export const secondUser: User = new User({
  id: 2,
  email: 'Shanna@melissa.tv',
  address: addressFixture.secondAddress,
  phone: '010-692-6593 x09125',
  website: 'anastasia.net',
  company: companyFixture.secondCompany,
  userName: 'Antonette',
  fullName: 'Ervin Howell',
});

export const users: User[] = [
  firstUser,
  secondUser
];
