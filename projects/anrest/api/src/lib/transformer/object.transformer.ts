import { Type } from '@angular/core';

import { ComplexDataTransformer } from './transformer';
import { ObjectCollector } from '../object-collector';
import { Meta } from '../meta/meta';

export abstract class ObjectTransformer extends ComplexDataTransformer {

  protected constructor(private collector: ObjectCollector) {
    super();
  }

  protected getObject(type: Type<any>, id?: string): any {
    let object = this.collector.get(id);
    if (object) {
      return object;
    }
    object = new type();
    if (id) {
      Meta.getForObject(object).id = id;
      this.collector.set(object);
    }
    return object;
  }

  abstract transform(data: any, type: Type<any>): any;
}
