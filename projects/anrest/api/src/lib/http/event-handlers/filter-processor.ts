import { HttpParams } from '@angular/common/http';

import { BeforeGetListEvent } from '../../event/event';
import { EventHandler } from '../../event/handler';
import { BeforeGetList } from '../../decorator/event-handler';

@BeforeGetList()
export class FilterProcessor implements EventHandler {
  handle(event: BeforeGetListEvent) {
    if (event.params === undefined) {
      event.params = new HttpParams();
      for (const key in event.filters) {
        if (event.filters[key] || event.filters[key] === false) {
          event.params = event.params.set(
            key,
            typeof event.filters[key] === 'boolean' ? (event.filters[key] ? 'true' : 'false') : String(event.filters[key])
          );
        }
      }
    }
  }

  priority(): number {
    return 10;
  }
}
