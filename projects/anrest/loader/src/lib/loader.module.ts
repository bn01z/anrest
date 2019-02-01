import { ModuleWithProviders, NgModule } from '@angular/core';
import { LoaderFactory } from './loader-factory.service';
import { AnRestLoaderConfig, ApiLoaderConfig } from './loader.config';

const defaultConfig: ApiLoaderConfig = {
  preload: false,
  debounceTime: 0,
  replay: 1
};

@NgModule({
  providers: [
    {
      provide: AnRestLoaderConfig,
      useValue: defaultConfig,
    },
    LoaderFactory
  ]
})
export class AnRestLoaderModule {
  static config(config: ApiLoaderConfig = defaultConfig): ModuleWithProviders {
    return {
      ngModule: AnRestLoaderModule,
      providers: [
        {
          provide: AnRestLoaderConfig,
          useValue: config,
        },
        LoaderFactory
      ]
    };
  }
}
