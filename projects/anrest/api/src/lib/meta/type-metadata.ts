import { Type } from '@angular/core';

interface PropertyMetadata {
  property: string;
  type: Type<any>;
  name: string;
  transformers: string[];
}

interface HeadersMetadata {
  name: string;
  value: () => string;
  append: boolean;
  dynamic: boolean;
}

export class TypeMetadata {
  path: string;
  id: string;
  body: (object: any) => string;
  properties: PropertyMetadata[] = [];
  headers: HeadersMetadata[] = [];
  transformers: string[];

  constructor() {
    this.id = 'id';
  }
}
