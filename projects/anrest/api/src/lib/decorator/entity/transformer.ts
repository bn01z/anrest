import { Type, TypeDecorator } from '@angular/core';

import { Meta } from '../../meta/meta';

export function Transformer(transformer: string): TypeDecorator|PropertyDecorator {

  return (target: Object|Type<any>, propertyKey?: string) => {
    if (propertyKey) {
      Meta.getForType(<Type<any>>target.constructor).properties.forEach((value => {
        if (value.property === propertyKey) {
          value.transformers = () => [transformer].concat(value.transformers());
        }
      }));
    } else {
      Meta.getForType(<Type<any>>target).transformers = () => [transformer].concat(Meta.getForType(<Type<any>>target).transformers());
    }
  };
}
