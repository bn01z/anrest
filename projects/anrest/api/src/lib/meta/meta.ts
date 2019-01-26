import { Type } from '@angular/core';

import { TypeMetadata } from './type-metadata';
import { ObjectMetadata } from './object-metadata';
import { EventHandler } from '../event/handler';
import { EventsMetadata } from './event-metadata';

export class Meta {

  private static readonly typeMetaKey = '__anrest__type__meta__';
  private static readonly objectMetaKey = '__anrest__object__meta__';
  private static readonly eventMetaKey = '__anrest__event__meta__';

  private constructor() { }

  static getForType(type: Type<any>): TypeMetadata {
    return type.hasOwnProperty(Meta.typeMetaKey) ?
      (type as any)[Meta.typeMetaKey] :
      Object.defineProperty(type, Meta.typeMetaKey, { value: new TypeMetadata() })[Meta.typeMetaKey];
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
}
