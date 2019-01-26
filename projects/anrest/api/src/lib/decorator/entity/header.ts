import { Type } from '@angular/core';
import { Meta } from '../../meta/meta';

export function Header(headerName: string, append?: boolean): PropertyDecorator|MethodDecorator {

  return (target: Object, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>) => {
    Meta.getForType(<Type<any>>target.constructor).headers.push({
      name: headerName,
      value: descriptor ? descriptor.value : function () { return  this[propertyKey]; },
      append: append || false,
      dynamic: true
    });
  };
}
