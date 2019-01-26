import { InjectionToken } from '@angular/core';

import { Event } from './event';

export interface EventHandler {
  handle(event: Event);
  priority(): number;
}

export abstract class BaseEventHandler {
  abstract handle(event: Event);

  priority(): number {
    return 0;
  }
}

export const ANREST_HTTP_EVENT_HANDLERS = new InjectionToken<EventHandler[]>('anrest.http_event_handlers');
