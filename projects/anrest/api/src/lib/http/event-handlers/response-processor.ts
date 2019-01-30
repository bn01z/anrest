import { Type } from '@angular/core';

import { AfterGetItem, AfterGetList, AfterRemove, AfterSave } from '../../decorator/event-handler';
import { EventHandler } from '../../event/handler';
import { ObjectCollector } from '../../object-collector';
import { AfterEvent } from '../../event/event';
import { NormalizedCollectionResponse, NormalizedResponse } from '../../normalizer/normalized-response';
import { Collection } from '../../collection/collection';
import { AnRestHttpClient } from '../client';
import { Meta } from '../../meta/meta';
import { TransformerService } from '../../transformer/service';

@AfterGetList()
@AfterGetItem()
@AfterSave()
@AfterRemove()
export class ResponseProcessor implements EventHandler {

  constructor(private collector: ObjectCollector, private transformer: TransformerService) {}

  handle(event: AfterEvent) {
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
    let data;
    if (response.info.current !== undefined) {
      data = this.collector.get(response.info.current);
    }
    if (data === undefined) {
      data = new Collection(response.info, http, type);
    }
    data.length = 0;
    for (const object of response.data) {
      data.push(this.processObject(object, type));
    }
    Meta.getForObject(data).id = response.info.current;
    this.collector.set(data);
    return data;
  }

  private processObject(data: any, type: Type<any>) {
    return this.transformer.transform(data, type);
  }
}
