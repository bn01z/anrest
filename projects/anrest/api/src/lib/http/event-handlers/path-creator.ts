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

@BeforeGetList()
@BeforeGetItem()
@BeforeSave()
@BeforeRemove()
export class PathCreator implements EventHandler {

  constructor(@Inject(AnRestConfig) private config: ApiConfig) {}

  handle(event: BeforeEvent) {
    if (event.path === undefined) {
      let path = this.getBasePath(event.entityType());
      if (event instanceof BeforeGetItemEvent) {
        path += '/' + event.id;
      } else if (event instanceof BeforeRemoveEvent || (event instanceof BeforeSaveEvent && !event.isNew)) {
        path += '/' + event.data[this.getIdField(event.entityType())];
      }
      event.path = path;
    }
    if (event.path.indexOf(this.config.uri) !== 0) {
      event.path = this.config.uri + event.path;
    }
  }

  priority(): number {
    return 5;
  }

  private getBasePath(type: Type<any>) {
    return Meta.getForType(type).path || '';
  }

  private getIdField(type: Type<any>) {
    return Meta.getForType(type).id;
  }
}
