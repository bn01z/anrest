import { HttpParams } from '@angular/common/http';

import { BeforeGetListEvent } from '../../event/event';
import { EventHandler } from '../../event/handler';
import { BeforeGetList } from '../../decorator/event-handler';
import { Meta } from '../../meta/meta';

@BeforeGetList()
export class FilterProcessor implements EventHandler {
  handle(event: BeforeGetListEvent) {
    if (event.params === undefined) {
      event.params = this.processFilters(new HttpParams(), event.filters);
    }
  }

  private processFilters(params: HttpParams, filter: any, prefix = ''): HttpParams {
    if (Array.isArray(filter)) {
      prefix = prefix + '[]';
      for (const value of filter) {
        params = this.processFilters(params, value, prefix);
      }
    } else if (typeof filter === 'object') {
      const apiMeta = Meta.getForType(filter.constructor, true);
      if (apiMeta) {
        params = params.append(prefix, String(filter[apiMeta.id]));
      } else {
        for (const key in filter) {
          const newPrefix = prefix ? (prefix + '[' + key + ']') : key;
          params = this.processFilters(params, filter[key], newPrefix);
        }
      }
    } else {
      if (filter || filter === false) {
        params = params.append(prefix, typeof filter === 'boolean' ? (filter ? 'true' : 'false') : String(filter));
      }
    }

    return params;
  }

  priority(): number {
    return 10;
  }
}
