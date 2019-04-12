import { DataTransformer } from './transformer';
import { Injectable, Type } from '@angular/core';
import { Meta } from '../meta/meta';
import { ObjectCollector } from '../object-collector';

@Injectable()
export class ReferenceFormatterTransformer implements DataTransformer {

  constructor(private collector: ObjectCollector) {}

  transform(data: any, type: Type<any>) {
    if (data === undefined || data === null) {
      return null;
    }
    const result = {};
    const meta = Meta.getForType(type);
    const id = [meta.path, data].join('/');
    if (id) {
      const object = this.collector.get(id);
      for (const key of Object.getOwnPropertyNames(object)) {
        result[key] = object[key];
      }
    }
    result[meta.id] = data;

    return result;
  }

  supports(name: string): boolean {
    return 'reference-formatter' === name;
  }
}
