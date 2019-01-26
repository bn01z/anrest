import { Type, TypeDecorator } from '@angular/core';
import { Meta } from '../../meta/meta';
import { HttpModule } from '../../http/http.module';
import { EntityTransformer } from '../../transformer/entity.transformer';

export function Resource(path: string): TypeDecorator {

  return (target: Type<any>) => {
    const meta = Meta.getForType(target);
    meta.path = path;
    meta.transformers = [EntityTransformer];

    meta.subresources.forEach((subresourceInfo) => {
      const subresourcePath = subresourceInfo.path || Meta.getForType(subresourceInfo.type).path;
      target.prototype[subresourceInfo.methodName] = subresourceInfo.collection ?
        function () {
          return HttpModule.client.getList(subresourceInfo.type, undefined, meta.path + '/' + this[meta.id] + subresourcePath);
        } :
        function () {
          return HttpModule.client.getItem(subresourceInfo.type, undefined, meta.path + '/' + this[meta.id] + subresourcePath);
        };
    });
  };
}
