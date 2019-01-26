import { BeforeSaveEvent } from '../../event/event';
import { EventHandler } from '../../event/handler';
import { BeforeSave } from '../../decorator/event-handler';
import { Meta } from '../../meta/meta';

@BeforeSave()
export class BodyConverter implements EventHandler {
  handle(event: BeforeSaveEvent) {
    const bodyFunction = Meta.getForType(event.entityType()).body;
    event.data = bodyFunction ? bodyFunction(event.data) : this.extractData(event);
  }

  priority(): number {
    return 0;
  }

  private extractData(event: BeforeSaveEvent) {
    const body = {};
    Meta.getForType(event.entityType()).properties
      .forEach((propertyInfo) => {
        body[propertyInfo.name] = event.data[propertyInfo.property];
      });
    return body;
  }
}
