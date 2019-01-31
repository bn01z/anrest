import { Type } from '@angular/core';
import { Meta } from '../../meta/meta';
import { HttpModule } from "../../http/http.module";

export function HasOne(type: Type<any>, path?: string): MethodDecorator {

  return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    const itemMeta = Meta.getForType(<Type<any>>target.constructor);

    descriptor.value = function () {
      return HttpModule.client.getItem(
        type,
        undefined,
        itemMeta.path + '/' + this[itemMeta.id] + (path || Meta.getForType(type).path)
      );
    };
  };
}
