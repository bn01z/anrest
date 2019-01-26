import { InjectionToken } from '@angular/core';

export interface ApiLoaderConfig {
  debounceTime?: number;
  replay?: number;
  preload?: boolean;
}

export const AnRestLoaderConfig = new InjectionToken<ApiLoaderConfig>('anrest.loader_config');
