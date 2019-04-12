import { Inject, Type } from '@angular/core';

import {
  BeforeEvent,
  BeforeGetItemEvent,
  BeforeRemoveEvent,
  BeforeSaveEvent
} from '../../event/event';
import { EventHandler } from '../../event/handler';
import { AnRestConfig, ApiConfig } from '../../api.config';
import { BeforeGetList, BeforeGetItem, BeforeRemove, BeforeSave } from '../../decorator/event-handler';
import { Meta } from '../../meta/meta';
import { ObjectCollector } from '../../object-collector';

@BeforeSave()
@BeforeRemove()
export class IsManagedChecker implements EventHandler {

  constructor(@Inject(AnRestConfig) private config: ApiConfig, private collector: ObjectCollector) {}

  handle(event: BeforeSaveEvent|BeforeRemoveEvent) {
    event.isManaged = this.collector.has(this.getBasePath(event.entityType()) + '/' + event.data[this.getIdField(event.entityType())]);
  }

  priority(): number {
    return 10;
  }

  private getBasePath(type: Type<any>) {
    return Meta.getForType(type).path || '';
  }

  private getIdField(type: Type<any>) {
    return Meta.getForType(type).id;
  }
}
