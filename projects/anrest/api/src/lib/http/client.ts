import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { AnRestHttpHandler } from './handler';
import { HttpFilter } from './filter';
import {
  AfterGetItemEvent,
  AfterGetListEvent,
  AfterRemoveEvent,
  AfterSaveEvent,
  BeforeGetItemEvent,
  BeforeGetListEvent,
  BeforeRemoveEvent,
  BeforeSaveEvent
} from '../event/event';
import { EventsService } from '../event/service';
import {Meta} from "../meta/meta";
import { NormalizedResponse } from "../normalizer/normalized-response";

@Injectable()
export class AnRestHttpClient extends HttpClient {

  constructor(handler: AnRestHttpHandler, private eventsService: EventsService) {
    super(handler);
  }

  getList(entityType: Type<any>, filter?: HttpFilter, path?: string): Observable<any> {
    const event = new BeforeGetListEvent(this, entityType, filter);
    event.path = path;
    this.eventsService.broadcast(event);
    return this.get(event.path, { params: event.params, headers: event.headers, observe: 'response'}).pipe(
      map((response: HttpResponse<any>) =>
           (<AfterGetListEvent> this.eventsService.broadcast(new AfterGetListEvent(this, entityType, response))).data)
    );
  }

  getItem(entityType: Type<any>, id: number|string, path?: string): Observable<any> {
    const event = new BeforeGetItemEvent(this, entityType, id);
    event.path = path;
    this.eventsService.broadcast(event);
    return this.get(event.path, { headers: event.headers, observe: 'response'}).pipe(
      map((response: HttpResponse<any>) =>
          (<AfterGetItemEvent> this.eventsService.broadcast(new AfterGetItemEvent(this, entityType, response))).data)
    );
  }

  getReference(entityType: Type<any>, id: number|string): any {
    const data = {};
    data[Meta.getForType(entityType).id] = id;

    return (<AfterGetItemEvent> this.eventsService.broadcast(
      new AfterGetItemEvent(this, entityType, new NormalizedResponse(data)))
    ).data
  }

  refreshItem(entity: any): Observable<any> {
    const meta = Meta.getForType(entity.constructor);
    if (!meta.path) {
      return of(entity);
    }

    return this.getItem(entity.constructor, entity[meta.id]);
  }

  saveItem(entity: any): Observable<any> {
    const event = <BeforeSaveEvent> this.eventsService.broadcast(new BeforeSaveEvent(this, entity.constructor, entity));
    return this[event.isNew ? 'put' : 'post'](event.path, event.data, { headers: event.headers }).pipe(
      map((response: HttpResponse<any>) =>
        (<AfterSaveEvent> this.eventsService.broadcast(new AfterSaveEvent(this, entity.constructor, response))).data)
    );
  }

  removeItem(entity: any): Observable<any> {
    return of(<BeforeRemoveEvent> this.eventsService.broadcast(new BeforeRemoveEvent(this, entity.constructor, entity))).pipe(
      mergeMap((event: BeforeRemoveEvent) => {
        if (!event.isManaged) {
          return throwError({ error: 'Entity not managed!' });
        }
        return this.delete(event.path, { headers: event.headers }).pipe(
          map((response: HttpResponse<any>) =>
            (<AfterRemoveEvent> this.eventsService.broadcast(new AfterRemoveEvent(this, entity.constructor, response))).data)
        );
      })
    );
  }
}
