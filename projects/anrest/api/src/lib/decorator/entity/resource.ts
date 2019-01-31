import { Type, TypeDecorator } from '@angular/core';
import { Meta } from '../../meta/meta';

export function Resource(path?: string): TypeDecorator {

  return (target: Type<any>) => {
    const meta = Meta.getForType(target);
    meta.path = path;
    meta.transformers = ['entity'];
  };
}
