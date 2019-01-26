import { Property } from '@anrest/api';

export class Company {
  @Property() name: string;
  @Property() catchPhrase: string;
  @Property() bs: string[];
}
