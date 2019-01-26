import { Inject, Injectable, Optional, Type } from '@angular/core';

import { ANREST_HTTP_EVENT_HANDLERS, EventHandler } from './handler';
import { Event } from './event';
import { Meta } from '../meta/meta';

@Injectable()
export class EventsService {

  constructor(@Optional() @Inject(ANREST_HTTP_EVENT_HANDLERS) private readonly handlers: EventHandler[]) {
    if (!Array.isArray(this.handlers)) {
      this.handlers = [];
    }
    this.handlers.sort((x: EventHandler, y: EventHandler)  => {
      if (x.priority() === y.priority()) {
        return 0;
      }
      return x.priority() > y.priority() ? -1 : 1;
    });
  }

  public broadcast(event: Event): Event {
    for (const handler of this.handlers) {
      const eventData = Meta.getForEvent(<Type<any>>handler.constructor).events.filter((e) => e.type === event.constructor).shift();
      if (eventData && (eventData.entities.length === 0 || eventData.entities.indexOf(event.entityType()) >= 0)) {
        handler.handle(event);
      }
      if (event.isPropagationStopped()) {
        break;
      }
    }
    return event;
  }
}
