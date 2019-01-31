import { Inject, Injectable, Optional, Type } from '@angular/core';

import { ANREST_DATA_TRANSFORMERS, ComplexDataTransformer, DataTransformer } from './transformer';
import { Meta } from '../meta/meta';

@Injectable()
export class TransformerService {

  constructor(@Optional() @Inject(ANREST_DATA_TRANSFORMERS) private readonly transformers: DataTransformer[]) {
    if (!Array.isArray(this.transformers)) {
      this.transformers = [];
    }
    this.transformers.forEach((transformer) => {
      if (transformer instanceof ComplexDataTransformer) {
        transformer.transformers = this.transformers;
      }
    });
  }

  public transform(data: any, type: Type<any>, transformerTypes?: string[]): any {
    for (const transformerType of (transformerTypes || Meta.getForType(type).transformers)) {
      data = this.findTransformer(transformerType).transform(data, type);
    }
    return data;
  }

  private findTransformer(transformerType: string): DataTransformer {
    return this.transformers.filter((transformer) => transformer.supports(transformerType))[0];
  }
}
