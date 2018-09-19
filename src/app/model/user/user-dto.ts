import { AddressDto } from '../address/address-dto';
import { CompanyDto } from '../company/company-dto';

export interface UserDto {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressDto;
  phone: string;
  website: string;
  company: CompanyDto;
}
