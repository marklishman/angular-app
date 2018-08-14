import { Address } from './address';
import { Company } from './company';

export class User {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly username: string,
    public readonly email: string,
    public readonly address: Address,
    public readonly phone: string,
    public readonly website: string,
    public readonly company: Company
  ) {}
}
