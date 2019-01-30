import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AnRestConfig, ApiConfig } from './api.config';
import { NormalizerModule } from './normalizer/normalizer.module';
import { HttpModule } from './http/http.module';
import { EventModule } from './event/event.module';
import {ObjectCollector} from "./object-collector";

const defaultConfig = { uri: '/api' };

@NgModule({
  imports: [
    HttpClientModule,
    HttpModule,
    NormalizerModule,
    EventModule
  ],
  providers: [
    {
      provide: AnRestConfig,
      useValue: defaultConfig,
    },
    ObjectCollector
  ]
})
export class AnRestApiModule {
  static config(config: ApiConfig = defaultConfig): ModuleWithProviders {
    return {
      ngModule: AnRestApiModule,
      providers: [
        {
          provide: AnRestConfig,
          useValue: config,
        }
      ]
    };
  }
}
