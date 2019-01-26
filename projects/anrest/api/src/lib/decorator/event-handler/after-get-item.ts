import { Type, TypeDecorator } from '@angular/core';
import { Meta } from '../../meta/meta';
import { AfterGetItemEvent } from '../../event/event';

export function AfterGetItem(entity?: Type<any>): TypeDecorator {

  return (target: Type<any>) => {
    const events = Meta.getForEvent(target).events;
    let event = events.filter((e) => e.type === AfterGetItemEvent).shift();
    if (!event) {
      event = { type: AfterGetItemEvent, entities: [] };
      events.push(event);
    }
    if (entity) {
      event.entities.push(entity);
    }
  };
}
