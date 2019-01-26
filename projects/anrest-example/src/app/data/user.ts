import { Property, Resource } from '@anrest/api';
import { Address } from './address';
import { Company } from './company';

@Resource('/users')
export class User {
  @Property() id: number;
  @Property() name: string;
  @Property() email: string;
  @Property() phone: string;
  @Property() website: string;
  @Property() address: Address;
  @Property() company: Company;
}
