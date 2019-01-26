import { Type } from '@angular/core';
import { Meta } from '../../meta/meta';

export function Id(): PropertyDecorator {

  return (target: Object, propertyKey: string) => {
    Meta.getForType(<Type<any>>target.constructor).id = propertyKey;
  };
}
