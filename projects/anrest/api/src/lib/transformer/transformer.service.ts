import { Inject, Injectable, Optional, Type } from '@angular/core';

import { ANREST_DATA_TRANSFORMERS, ComplexDataTransformer, DataTransformer } from './transformer';
import { Meta } from '../meta/meta';
import { AnRestHttpClient } from '../http/client';

@Injectable()
export class TransformerService {

  private initialized = false;

  constructor(@Optional() @Inject(ANREST_DATA_TRANSFORMERS) private readonly transformers: DataTransformer[]) {
    if (!Array.isArray(this.transformers)) {
      this.transformers = [];
    }
  }

  public init(http: AnRestHttpClient) {
    if (!this.initialized) {
      this.transformers.forEach((transformer) => {
        if (transformer instanceof ComplexDataTransformer) {
          transformer.transformers = this.transformers;
          transformer.http = http;
        }
      });
      this.initialized = true;
    }
  }

  public transform(data: any, type: Type<any>): any {
    for (const transformerType of Meta.getForType(type).transformers) {
      data = this.findTransformer(transformerType).transform(data, type);
    }
    return data;
  }

  private findTransformer(transformerType: string): DataTransformer {
    return this.transformers.filter((transformer) => transformer.supports(transformerType))[0];
  }
}
