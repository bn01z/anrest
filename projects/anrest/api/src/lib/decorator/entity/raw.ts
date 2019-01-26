import { Type } from '@angular/core';

import { Meta } from '../../meta/meta';
import { SimpleObjectTransformer } from '../../transformer/simple-object.transformer';

export function Raw(): PropertyDecorator {

  return (target: Object, propertyKey: string) => {
    Meta.getForType(<Type<any>>target.constructor).properties.forEach((value => {
      if (value.property === propertyKey) {
        value.transformers = [SimpleObjectTransformer];
      }
    }));
  };
}
