import { Type } from '@angular/core';
import 'reflect-metadata';
import { Meta } from '../../meta/meta';
import { NumberTransformer } from '../../transformer/number.transformer';
import { StringTransformer } from '../../transformer/string.transformer';
import { DateTransformer } from '../../transformer/date.transformer';
import { SimpleObjectTransformer } from '../../transformer/simple-object.transformer';
import { EntityTransformer } from '../../transformer/entity.transformer';

function getTransformers(type: Type<any>) {
  switch (type) {
    case Number:
      return [NumberTransformer];
    case String:
      return [StringTransformer];
    case Date:
      return [DateTransformer];
    case Object:
      return [SimpleObjectTransformer];
    case undefined:
    case null:
    case Array:
      return [];
    default:
      return [EntityTransformer];
  }
}

export function Property(type?: Type<any>): PropertyDecorator {

  return (target: Object, propertyKey: string) => {
    if (!type) {
      type = Reflect.getMetadata('design:type', target, propertyKey);
      }
    Meta.getForType(<Type<any>>target.constructor).properties.push({
      property: propertyKey,
      type: type,
      name: propertyKey,
      transformers: getTransformers(type)
    });
  };
}
