import { Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { AnRestConfig, ApiConfig } from '../../api.config';
import { BeforeEvent, BeforeRemoveEvent, BeforeSaveEvent } from '../../event/event';
import { EventHandler } from '../../event/handler';
import { BeforeGetItem, BeforeGetList, BeforeRemove, BeforeSave } from '../../decorator/event-handler';
import { Meta } from '../../meta/meta';

@BeforeGetList()
@BeforeGetItem()
@BeforeSave()
@BeforeRemove()
export class HeadersCreator implements EventHandler {

  constructor(@Inject(AnRestConfig) private config: ApiConfig) {}

  handle(event: BeforeEvent) {
    event.headers = event.headers || new HttpHeaders();
    for (const header of (this.config.headers || [])) {
      event.headers = event.headers[header.append ? 'append' : 'set'](header.name, header.value);
    }
    for (const header of Meta.getForType(event.entityType()).headers) {
      if (!header.dynamic) {
        event.headers = event.headers[header.append ? 'append' : 'set'](header.name, header.value());
      } else if (event instanceof BeforeSaveEvent || event instanceof BeforeRemoveEvent) {
        event.headers = event.headers[header.append ? 'append' : 'set'](header.name, header.value.call(event.data));
      }
    }
  }

  priority(): number {
    return 10;
  }
}
