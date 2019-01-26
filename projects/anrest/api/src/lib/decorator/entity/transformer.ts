import { Type, TypeDecorator } from '@angular/core';

import { Meta } from '../../meta/meta';
import { DataTransformer } from '../../transformer/transformer';

export function Transformer(transformer: Type<DataTransformer>): TypeDecorator|PropertyDecorator {

  return (target: Object|Type<any>, propertyKey?: string) => {
    if (propertyKey) {
      Meta.getForType(<Type<any>>target.constructor).properties.forEach((value => {
        if (value.property === propertyKey) {
          value.transformers.unshift(transformer);
        }
      }));
    } else {
      Meta.getForType(<Type<any>>target).transformers.unshift(transformer);
    }
  };
}
