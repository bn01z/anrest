import { Type } from '@angular/core';

import { Meta } from '../../meta/meta';

export function Reference(): PropertyDecorator {

  return (target: Object, propertyKey: string) => {
    Meta.getForType(<Type<any>>target.constructor).properties.forEach((value => {
      if (value.property === propertyKey) {
        value.transformers.unshift('reference');
      }
    }));
  };
}
