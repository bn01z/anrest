import { Type } from '@angular/core';
import { Meta } from '../../meta/meta';

export function HasMany(type: Type<any>, path?: string): MethodDecorator {

  return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    Meta.getForType(<Type<any>>target.constructor).subresources.push({
      methodName: propertyKey,
      type: type,
      path: path,
      collection: true
    });
  };
}
