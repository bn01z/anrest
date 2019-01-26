import { Type, TypeDecorator } from '@angular/core';
import { Meta } from '../meta/meta';

export function LoaderDebounceTime(time: number): TypeDecorator {

  return (target: Type<any>) => {
    Meta.getForType(target).debounceTime = time;
  };
}
