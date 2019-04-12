import { NgModule, Optional } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpBackend } from '@angular/common/http';

import { ANREST_HTTP_EVENT_HANDLERS } from '../event/handler';
import { ANREST_HTTP_INTERCEPTORS, anrestHandlerFactory, AnRestHttpHandler } from './handler';
import { PathCreator } from './event-handlers/path-creator';
import { HeadersCreator } from './event-handlers/headers-creator';
import { FilterProcessor } from './event-handlers/filter-processor';
import { BodyConverter } from './event-handlers/body-converter';
import { ResponseProcessor } from './event-handlers/response-processor';
import { ResponseNormalizer } from './event-handlers/response-normalizer';
import { AnRestHttpClient } from './client';
import { TransformerModule } from '../transformer/transformer.module';
import { IsManagedChecker } from './event-handlers/is-managed-checker';

@NgModule({
  imports: [
    TransformerModule
  ],
  providers: [
    AnRestHttpClient,
    {
      provide: AnRestHttpHandler,
      useFactory: anrestHandlerFactory,
      deps: [HttpBackend, [ new Optional(), ANREST_HTTP_INTERCEPTORS ], [ new Optional(), HTTP_INTERCEPTORS ]],
    },
    {
      provide: ANREST_HTTP_EVENT_HANDLERS,
      useClass: IsManagedChecker,
      multi: true
    },
    {
      provide: ANREST_HTTP_EVENT_HANDLERS,
      useClass: PathCreator,
      multi: true
    },
    {
      provide: ANREST_HTTP_EVENT_HANDLERS,
      useClass: HeadersCreator,
      multi: true
    },
    {
      provide: ANREST_HTTP_EVENT_HANDLERS,
      useClass: FilterProcessor,
      multi: true
    },
    {
      provide: ANREST_HTTP_EVENT_HANDLERS,
      useClass: BodyConverter,
      multi: true
    },
    {
      provide: ANREST_HTTP_EVENT_HANDLERS,
      useClass: ResponseProcessor,
      multi: true
    },
    {
      provide: ANREST_HTTP_EVENT_HANDLERS,
      useClass: ResponseNormalizer,
      multi: true
    },
  ]
})
export class HttpModule {
  public static client: AnRestHttpClient = undefined;

  constructor(client: AnRestHttpClient) {
    HttpModule.client = client;
  }
}
