import { Type } from '@angular/core';

import { TypeMetadata } from './type-metadata';
import { ObjectMetadata } from './object-metadata';
import { EventsMetadata } from './event-metadata';

export class Meta {

  private static readonly typeMetaKey = '__anrest__type__meta__';
  private static readonly objectMetaKey = '__anrest__object__meta__';
  private static readonly eventMetaKey = '__anrest__event__meta__';

  private constructor() { }

  static getForType(type: Type<any>, disableCreation = false): TypeMetadata {
    return type.hasOwnProperty(Meta.typeMetaKey) ?
      (type as any)[Meta.typeMetaKey] :
      (disableCreation ? undefined : Object.defineProperty(type, Meta.typeMetaKey, { value: Meta.createTypeMeta(type) })[Meta.typeMetaKey]);
  }

  static getForObject(type: Object): ObjectMetadata {
    return type.hasOwnProperty(Meta.objectMetaKey) ?
      (type as any)[Meta.objectMetaKey] :
      Object.defineProperty(type, Meta.objectMetaKey, { value: new ObjectMetadata() })[Meta.objectMetaKey];
  }

  static getForEvent(type: Type<any>): EventsMetadata {
    return type.hasOwnProperty(Meta.eventMetaKey) ?
      (type as any)[Meta.eventMetaKey] :
      Object.defineProperty(type, Meta.eventMetaKey, { value: new EventsMetadata() })[Meta.eventMetaKey];
  }

  private static createTypeMeta(type: Type<any>) {
    const meta = new TypeMetadata();
    const baseMeta: TypeMetadata = Object.getPrototypeOf(type)[Meta.typeMetaKey];

    if (baseMeta) {
      meta.id = baseMeta.id;
      meta.path = baseMeta.path;
      meta.body = baseMeta.body;
      meta.transformers = baseMeta.transformers;
      for (const key in baseMeta.properties) {
        meta.properties[key] = Object.assign({}, baseMeta.properties[key]);
      }
      for (const key in baseMeta.headers) {
        meta.headers[key] = Object.assign({}, baseMeta.headers[key]);
      }
    }

    return meta;
  }
}
