import { ModuleWithProviders, NgModule } from '@angular/core';
import { ANREST_HTTP_INTERCEPTORS } from '@anrest/api';

import { AnRestCacheConfig, ApiCacheConfig } from './cache.config';
import { CacheEngine } from './engine/engine';
import { InMemoryCacheEngine } from './engine/in-memory.engine';
import { CacheInterceptor } from './cache.interceptor';

const defaultConfig = { ttl: 3600000, engine: InMemoryCacheEngine };

@NgModule({
  providers: [{
    provide: AnRestCacheConfig,
    useValue: defaultConfig,
  },
    {
      provide: ANREST_HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    },
    {
      provide: CacheEngine,
      useClass: defaultConfig.engine
    }]
})
export class AnRestCacheModule {
  static config(config: ApiCacheConfig = defaultConfig): ModuleWithProviders {
    return {
      ngModule: AnRestCacheModule,
      providers: [
        {
          provide: AnRestCacheConfig,
          useValue: config,
        },
        {
          provide: ANREST_HTTP_INTERCEPTORS,
          useClass: CacheInterceptor,
          multi: true
        },
        {
          provide: CacheEngine,
          useClass: config.engine
        }
      ]
    };
  }
}
