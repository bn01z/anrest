import { InjectionToken, Type } from '@angular/core';

export interface DataTransformer {
  transform(data: any, type?: Type<any>): any;
  supports(name: string): boolean;
}

export abstract class ComplexDataTransformer implements DataTransformer {
  private _transformers: DataTransformer[];

  abstract transform(data: any, type: Type<any>): any;
  abstract supports(name: string): boolean;


  get transformers(): DataTransformer[] {
    return this._transformers;
  }

  set transformers(value: DataTransformer[]) {
    this._transformers = value;
  }

  protected findTransformer(transformerType: string): DataTransformer {
    return this._transformers.filter((transformer) => transformer.supports(transformerType))[0];
  }
}

export const ANREST_DATA_TRANSFORMERS = new InjectionToken<DataTransformer[]>('anrest.data_transformers');
