import { Type } from '@angular/core';

import { AnRestHttpClient } from './http/client';
import { HttpFilter } from './http/filter';
import { Observable } from 'rxjs';

export abstract class ApiService {
  protected constructor(private http: AnRestHttpClient) {}

  abstract entityType(): Type<any>;

  public getList(filter?: HttpFilter): Observable<any> {
    return this.http.getList(this.entityType(), filter);
  }

  public get(id: number|string): Observable<any> {
    return this.http.getItem(this.entityType(), id);
  }

  public getReference(id: number|string): Observable<any> {
    return this.http.getReference(this.entityType(), id);
  }

  public save(entity: any): Observable<any> {
    return this.http.saveItem(entity);
  }

  public remove(entity: any): Observable<any> {
    return this.http.removeItem(entity);
  }

  public refresh(entity: any): Observable<any> {
    return this.http.refreshItem(entity);
  }
}
