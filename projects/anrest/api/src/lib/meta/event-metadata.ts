import { Type } from '@angular/core';

interface EventMetadata {
  type: any;
  entities: Type<any>[];
}

export class EventsMetadata {
  events: EventMetadata[] = [];
}
