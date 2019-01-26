import { HttpResponse } from '@angular/common/http';
import { InjectionToken } from '@angular/core';

import { NormalizedResponse } from './normalized-response';

export interface Normalizer {
  normalize(response: HttpResponse<any>): NormalizedResponse;
  supports(type: string): boolean;
}

export const ANREST_HTTP_DATA_NORMALIZERS = new InjectionToken<Normalizer[]>('anrest.http_data_normalizers');
