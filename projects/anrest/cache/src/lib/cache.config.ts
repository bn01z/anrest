import { InjectionToken } from '@angular/core';

export interface ApiCacheConfig {
  ttl: number;
  engine: any;
  options?: { [index: string]: any };
}

export const AnRestCacheConfig = new InjectionToken<ApiCacheConfig>('anrest.cache_config');
