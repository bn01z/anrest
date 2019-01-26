import { Type, TypeDecorator } from '@angular/core';
import { Meta } from '../../meta/meta';
import { AfterRemoveEvent } from '../../event/event';

export function AfterRemove(entity?: Type<any>): TypeDecorator {

  return (target: Type<any>) => {
    const events = Meta.getForEvent(target).events;
    let event = events.filter((e) => e.type === AfterRemoveEvent).shift();
    if (!event) {
      event = { type: AfterRemoveEvent, entities: [] };
      events.push(event);
    }
    if (entity) {
      event.entities.push(entity);
    }
  };
}
