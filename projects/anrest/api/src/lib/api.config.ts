import { InjectionToken } from '@angular/core';

export interface ApiConfig {
  uri: string;
  headers?: { name: string, value: string, append?: boolean}[];
  options?: { [index: string]: any };
}

export const AnRestConfig = new InjectionToken<ApiConfig>('anrest.api_config');
