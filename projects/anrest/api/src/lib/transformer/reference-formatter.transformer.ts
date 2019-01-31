import { DataTransformer } from './transformer';
import { Type } from '@angular/core';
import { Meta } from '../meta/meta';

export class ReferenceFormatterTransformer implements DataTransformer {
  transform(data: any, type: Type<any>) {
    if (data === undefined || data === null) {
      return null;
    }
    const result = {};
    result[Meta.getForType(type).id] = data;

    return result;
  }

  supports(name: string): boolean {
    return 'reference-formatter' === name;
  }
}
