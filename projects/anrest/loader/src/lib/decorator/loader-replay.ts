import { Type, TypeDecorator } from '@angular/core';
import { Meta } from '../meta/meta';

export function LoaderReplay(num: number): TypeDecorator {

  return (target: Type<any>) => {
    Meta.getForType(target).replay = num;
  };
}
