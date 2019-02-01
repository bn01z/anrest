import { InjectionToken, Type } from '@angular/core';
import { AnRestHttpClient } from "../http/client";

export interface DataTransformer {
  transform(data: any, type?: Type<any>): any;
  supports(name: string): boolean;
}

export abstract class ComplexDataTransformer implements DataTransformer {
  public transformers: DataTransformer[];
  public http: AnRestHttpClient;

  abstract transform(data: any, type: Type<any>): any;
  abstract supports(name: string): boolean;

  protected findTransformer(transformerType: string): DataTransformer {
    return this.transformers.filter((transformer) => transformer.supports(transformerType))[0];
  }
}

export const ANREST_DATA_TRANSFORMERS = new InjectionToken<DataTransformer[]>('anrest.data_transformers');
