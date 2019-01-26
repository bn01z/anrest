import { Type, TypeDecorator } from '@angular/core';
import { Meta } from '../../meta/meta';
import { BeforeSaveEvent } from '../../event/event';

export function BeforeSave(entity?: Type<any>): TypeDecorator {

  return (target: Type<any>) => {
    const events = Meta.getForEvent(target).events;
    let event = events.filter((e) => e.type === BeforeSaveEvent).shift();
    if (!event) {
      event = { type: BeforeSaveEvent, entities: [] };
      events.push(event);
    }
    if (entity) {
      event.entities.push(entity);
    }
  };
}
