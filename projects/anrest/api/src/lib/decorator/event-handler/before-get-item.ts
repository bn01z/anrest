import { Type, TypeDecorator } from '@angular/core';
import { Meta } from '../../meta/meta';
import { BeforeGetItemEvent } from '../../event/event';

export function BeforeGetItem(entity?: Type<any>): TypeDecorator {

  return (target: Type<any>) => {
    const events = Meta.getForEvent(target).events;
    let event = events.filter((e) => e.type === BeforeGetItemEvent).shift();
    if (!event) {
      event = { type: BeforeGetItemEvent, entities: [] };
      events.push(event);
    }
    if (entity) {
      event.entities.push(entity);
    }
  };
}
