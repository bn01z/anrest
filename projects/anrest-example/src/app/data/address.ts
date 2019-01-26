import { Property } from '@anrest/api';

export class Geo {
  @Property() lat: string;
  @Property() lng: string;
}

export class Address {
  @Property() street: string;
  @Property() suite: string;
  @Property() city: string;
  @Property() zipcode: string;
  @Property() geo: Geo;
}
