import { Type } from '@angular/core';
import { Meta } from '../../meta/meta';

export function Body(): PropertyDecorator|MethodDecorator {

  return (target: Object, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) => {
    Meta.getForType(<Type<any>>target.constructor).body =
      (object: any) => (descriptor ? descriptor.value : function () { return this[propertyKey]; }).call(object);
  };
}
