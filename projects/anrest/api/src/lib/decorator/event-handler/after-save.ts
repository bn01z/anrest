import { Type, TypeDecorator } from '@angular/core';
import { Meta } from '../../meta/meta';
import { AfterSaveEvent } from '../../event/event';

export function AfterSave(entity?: Type<any>): TypeDecorator {

  return (target: Type<any>) => {
    const events = Meta.getForEvent(target).events;
    let event = events.filter((e) => e.type === AfterSaveEvent).shift();
    if (!event) {
      event = { type: AfterSaveEvent, entities: [] };
      events.push(event);
    }
    if (entity) {
      event.entities.push(entity);
    }
  };
}
