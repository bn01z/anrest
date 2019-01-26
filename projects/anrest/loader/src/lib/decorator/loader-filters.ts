import { Type, TypeDecorator } from '@angular/core';
import { Meta } from '../meta/meta';

export function LoaderFilters(names: string[]): TypeDecorator {

  return (target: Type<any>) => {
    Meta.getForType(target).filters = names;
  };
}
