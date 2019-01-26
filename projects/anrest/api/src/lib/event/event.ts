import { Type } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { HttpFilter } from '../http/filter';
import { AnRestHttpClient } from '../http/client';

export interface Event {
  name(): string;
  entityType(): Type<any>;
  isPropagationStopped(): boolean;
  http(): AnRestHttpClient;
}

export abstract class BaseEvent implements Event {
  public propagate = true;

  protected constructor(private _http: AnRestHttpClient, private _entity: Type<any>) {}

  isPropagationStopped(): boolean {
    return !this.propagate;
  }

  entityType(): Type<any> {
    return this._entity;
  }

  http(): AnRestHttpClient {
    return this._http;
  }

  abstract name(): string;
}

export abstract class BeforeEvent extends BaseEvent {
  public path: string;
  public headers: HttpHeaders;
}

export abstract class AfterEvent extends BaseEvent {
  protected constructor(http: AnRestHttpClient, entityType: Type<any>, public data: any) {
    super(http, entityType);
  }
}

export class BeforeGetListEvent extends BeforeEvent {
  public params?: HttpParams;

  constructor(http: AnRestHttpClient, entityType: Type<any>, public filters?: HttpFilter) {
    super(http, entityType);
  }

  name(): string {
    return 'before-get-list';
  }
}

export class AfterGetListEvent extends AfterEvent {

  constructor(http: AnRestHttpClient, entityType: Type<any>, data: any) {
    super(http, entityType, data);
  }

  name(): string {
    return 'after-get-list';
  }
}

export class BeforeGetItemEvent extends BeforeEvent {

  constructor(http: AnRestHttpClient, entityType: Type<any>, public id: number|string) {
    super(http, entityType);
  }

  name(): string {
    return 'before-get-item';
  }
}

export class AfterGetItemEvent extends AfterEvent {

  constructor(http: AnRestHttpClient, entityType: Type<any>, data: any) {
    super(http, entityType, data);
  }

  name(): string {
    return 'after-get-item';
  }
}

export class BeforeSaveEvent extends BeforeEvent {
  public isNew: boolean;

  constructor(http: AnRestHttpClient, entityType: Type<any>, public data: any) {
    super(http, entityType);
  }

  name(): string {
    return 'before-save';
  }
}

export class AfterSaveEvent extends AfterEvent {

  constructor(http: AnRestHttpClient, entityType: Type<any>, data: any) {
    super(http, entityType, data);
  }

  name(): string {
    return 'after-save';
  }
}

export class BeforeRemoveEvent extends BeforeEvent {
  public isManaged: boolean;

  constructor(http: AnRestHttpClient, entityType: Type<any>, public data: any) {
    super(http, entityType);
  }

  name(): string {
    return 'before-remove';
  }
}

export class AfterRemoveEvent extends AfterEvent {

  constructor(http: AnRestHttpClient, entityType: Type<any>, data: any) {
    super(http, entityType, data);
  }

  name(): string {
    return 'after-remove';
  }
}
