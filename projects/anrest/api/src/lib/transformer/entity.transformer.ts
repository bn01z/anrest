import { Injectable, Type } from '@angular/core';

import { ObjectTransformer } from './object.transformer';
import { ObjectCollector } from '../http/object-collector';
import { Meta } from '../meta/meta';

@Injectable()
export class EntityTransformer extends ObjectTransformer {

  constructor(collector: ObjectCollector) {
    super(collector);
  }

  transform(data: any, type: Type<any>) {
    if (data === undefined || data === null) {
      return null;
    }
    const meta = Meta.getForType(type);

    return Array.isArray(data) ? data.map((object) => this.processObject(object, meta, type)) : this.processObject(data, meta, type);
  }

  private processObject(data: any, meta, type: Type<any>) {
    const id = data['@id'] || (data[meta.id] ? [meta.path, data[meta.id]].join('/') : undefined);
    const object = this.getObject(type, id);
    meta.properties.forEach((propertyInfo) => {
      let propertyData = data[propertyInfo.name];
      for (const transformerType of propertyInfo.transformers) {
        propertyData = this.findTransformer(transformerType).transform(propertyData, propertyInfo.type);
      }
      object[propertyInfo.property] = propertyData;
    });

    return object;
  }
}
