import { Type } from '@angular/core';
import 'reflect-metadata';
import { Meta } from '../../meta/meta';

function getTransformers(type: Type<any>) {
  switch (type) {
    case Number:
      return ['number'];
    case String:
      return ['string'];
    case Date:
      return ['date'];
    case Object:
      return ['simple-object'];
    case undefined:
    case null:
    case Array:
      return [];
    default:
      return ['entity'];
  }
}

export function Property(type?: () => Type<any>): PropertyDecorator {

  return (target: Object, propertyKey: string) => {
    if (!type) {
      const defaultType = Reflect.getMetadata('design:type', target, propertyKey);
      type = () => defaultType;
      }
    Meta.getForType(<Type<any>>target.constructor).properties.push({
      property: propertyKey,
      type: type,
      name: propertyKey,
      transformers: () => getTransformers(type())
    });
  };
}
