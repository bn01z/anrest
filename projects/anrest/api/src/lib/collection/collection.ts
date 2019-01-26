import { Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CollectionInfo } from './collection-info';
import { AnRestHttpClient } from '../http/client';

export class Collection<T> extends Array<T> {

  private static merge<T>(c1: Collection<T>, c2: Collection<T>): Collection<T> {
    const info = new CollectionInfo();
    info.itemsTotal = c1.info.itemsTotal;
    info.current = c1.info.current;
    info.first = c1.info.first;
    info.previous = c1.info.previous;
    info.next = c2.info.next;
    info.last = c1.info.last;
    info.alias = c1.info.alias;
    const c = new Collection<T>(info, c1.http, c1.type);
    c1.forEach((v) => c.push(v));
    c2.forEach((v) => c.push(v));
    return c;
  }

  constructor(private info: CollectionInfo, private http: AnRestHttpClient, private type: Type<any>, ...items: T[]) {
    super(...items);
    Object.setPrototypeOf(this, Collection.prototype);
  }

  get total(): number {
    return this.info.itemsTotal;
  }

  get page(): number {
    return this.info.page;
  }

  get pageTotal(): number {
    return this.info.pagesTotal;
  }

  public hasFirst(): boolean {
    return this.hasPrevious();
  }

  public firstPage(): Observable<Collection<T>> {
    return this.getPage(this.info.first);
  }

  public hasPrevious(): boolean {
    return !!this.info.previous;
  }

  public previousPage(): Observable<Collection<T>> {
    return this.getPage(this.info.previous);
  }

  public hasNext(): boolean {
    return !!this.info.next;
  }

  public nextPage(): Observable<Collection<T>> {
    return this.getPage(this.info.next);
  }

  public hasLast(): boolean {
    return this.hasNext();
  }

  public lastPage(): Observable<Collection<T>> {
    return this.getPage(this.info.last);
  }

  hasMore(): boolean {
    return this.hasNext();
  }

  loadMore(): Observable<Collection<any>> {
    return this.nextPage().pipe(
      map((result: Collection<T>) => Collection.merge<T>(this, result)),
    );
  }

  loadAll(): Observable<Collection<any>> {
    return this.http.getList(this.type, { pagination: false }, this.info.current);
  }

  private getPage(page): Observable<Collection<T>> {
    return page ? this.http.getList(this.type, undefined, page) : of(undefined);
  }
}
