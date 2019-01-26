import { Type } from '@angular/core';

import { LoaderMetadata } from './loader-metadata';

export class Meta {

  private static readonly loaderMetaKey = '__anrest__loader__meta__';

  private constructor() { }

  static getForType(type: Type<any>): LoaderMetadata {
    return type.hasOwnProperty(Meta.loaderMetaKey) ?
      (type as any)[Meta.loaderMetaKey] :
      Object.defineProperty(type, Meta.loaderMetaKey, { value: new LoaderMetadata() })[Meta.loaderMetaKey];
  }
}
