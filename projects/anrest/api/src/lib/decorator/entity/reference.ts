import { Type } from '@angular/core';

import { Meta } from '../../meta/meta';

export function Reference(type?: Type<any>): PropertyDecorator {

  return (target: Object, propertyKey: string) => {
    if (!type) {
      type = Reflect.getMetadata('design:type', target, propertyKey);
    }
    Meta.getForType(<Type<any>>target.constructor).properties.push({
      property: propertyKey,
      type: type,
      name: propertyKey,
      transformers: ['reference-formatter', 'entity']
    });
  };
}
