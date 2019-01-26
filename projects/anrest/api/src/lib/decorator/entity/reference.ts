import { Type } from '@angular/core';

import { Meta } from '../../meta/meta';
import { ReferenceTransformer } from '../../transformer/reference.transformer';

export function Reference(): PropertyDecorator {

  return (target: Object, propertyKey: string) => {
    Meta.getForType(<Type<any>>target.constructor).properties.forEach((value => {
      if (value.property === propertyKey) {
        value.transformers.unshift(ReferenceTransformer);
      }
    }));
  };
}
