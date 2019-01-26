import { Type } from '@angular/core';
import { DataTransformer } from '../transformer/transformer';

interface PropertyMetadata {
  property: string;
  type: Type<any>;
  name: string;
  transformers: Type<DataTransformer>[];
}

interface SubresourceMetadata {
  methodName: string;
  type: Type<any>;
  path: string;
  collection: boolean;
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
  subresources: SubresourceMetadata[] = [];
  headers: HeadersMetadata[] = [];
  transformers: Type<DataTransformer>[];

  constructor() {
    this.id = 'id';
  }
}
