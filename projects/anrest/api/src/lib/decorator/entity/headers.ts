import { Type, TypeDecorator } from '@angular/core';
import { Meta } from '../../meta/meta';

export function Headers(headers: { name: string, value: string, append?: boolean}[]): TypeDecorator {

  return (target: Type<any>) => {
    const headersMeta = Meta.getForType(target).headers;
    for (const header of headers) {
      headersMeta.push({
        name: header.name,
        value: () => header.value,
        append: header.append || false,
        dynamic: false
      });
    }
  };
}
