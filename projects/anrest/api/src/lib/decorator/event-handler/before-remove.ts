import { Type, TypeDecorator } from '@angular/core';
import { Meta } from '../../meta/meta';
import { BeforeRemoveEvent } from '../../event/event';

export function BeforeRemove(entity?: Type<any>): TypeDecorator {

  return (target: Type<any>) => {
    const events = Meta.getForEvent(target).events;
    let event = events.filter((e) => e.type === BeforeRemoveEvent).shift();
    if (!event) {
      event = { type: BeforeRemoveEvent, entities: [] };
      events.push(event);
    }
    if (entity) {
      event.entities.push(entity);
    }
  };
}
