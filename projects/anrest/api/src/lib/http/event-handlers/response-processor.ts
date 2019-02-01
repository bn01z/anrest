import { Type } from '@angular/core';

import { AfterGetItem, AfterGetList, AfterRemove, AfterSave } from '../../decorator/event-handler';
import { EventHandler } from '../../event/handler';
import { AfterEvent } from '../../event/event';
import { NormalizedCollectionResponse, NormalizedResponse } from '../../normalizer/normalized-response';
import { Collection } from '../../collection/collection';
import { AnRestHttpClient } from '../client';
import { TransformerService } from '../../transformer/transformer.service';

@AfterGetList()
@AfterGetItem()
@AfterSave()
@AfterRemove()
export class ResponseProcessor implements EventHandler {

  constructor(private transformer: TransformerService) {}

  handle(event: AfterEvent) {
    this.transformer.init(event.http());
    if (event.data instanceof NormalizedResponse) {
      event.data = event.data instanceof NormalizedCollectionResponse ?
        this.processCollection(event.data, event.entityType(), event.http()) :
        this.processObject(event.data.data, event.entityType());
    }
  }

  priority(): number {
    return 5;
  }

  private processCollection(response: NormalizedCollectionResponse, type: Type<any>, http: AnRestHttpClient) {
    return new Collection(response.info, http, type, ...response.data.map((data) => this.processObject(data, type)));
  }

  private processObject(data: any, type: Type<any>) {
    return this.transformer.transform(data, type);
  }
}
