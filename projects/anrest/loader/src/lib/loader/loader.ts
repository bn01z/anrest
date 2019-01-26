import { Type } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeMap, share, shareReplay, tap } from 'rxjs/operators';

import { AnRestHttpClient, Collection } from '@anrest/api';
import { ApiLoaderConfig } from '../loader.config';
import { Meta } from '../meta/meta';

interface Filters {
  [index: string]: BehaviorSubject<any>;
}

export class Loader {
  public readonly data: Observable<Collection<any>>;
  public readonly filters: Filters = {};
  private loading = false;

  constructor(protected http: AnRestHttpClient, protected entityType: Type<any>, protected config: ApiLoaderConfig) {
    this.data = this.createDataObservable();
  }

  get isLoading(): boolean {
    return this.loading;
  }

  clear() {
    for (const filterName of Object.getOwnPropertyNames(this.filters)) {
      this.filters[filterName].next(undefined);
    }
  }

  private createDataObservable(): Observable<Collection<any>> {
    const entityMeta = Meta.getForType(this.entityType);
    const replay = entityMeta.replay || this.config.replay || 0;
    const waitFor = entityMeta.debounceTime || this.config.debounceTime || 0;
    return this.setupObservables().pipe(
      replay ? shareReplay(replay) : share(),
      debounceTime(waitFor),
      tap(() => this.loading = true),
      mergeMap((data: any) => this.getList(data)),
      tap((result: Collection<any>) => this.onLoad(result)),
      tap(() => this.loading = false)
    );
  }

  protected setupObservables(): Observable<any> {
    return combineLatest(this.createFilters()).pipe(
      distinctUntilChanged(),
      map((data: any[]) => this.createQueryParams(data)),
      map((data: { [index: string]: any }) => this.filterQueryParams(data)),
      map((data: { [index: string]: any }) => this.convertQueryParams(data))
    );
  }

  private createFilters(): BehaviorSubject<any>[] {
    const filtersArray: BehaviorSubject<any>[] = [];
    Meta.getForType(this.entityType).filters.forEach((name: string) => {
      this.filters[name] = new BehaviorSubject<any>(undefined);
      filtersArray.push(this.filters[name]);
    });
    return filtersArray;
  }

  protected getList(filter: any): Observable<Collection<any>> {
    return this.http.getList(this.entityType, filter);
  }

  protected onLoad(data: Collection<any>) {}

  private createQueryParams(data: any[]): { [index: string]: any } {
    const result = {};
    for (const name in this.filters) {
      const value = data.shift();
      if (typeof value === 'object') {
        for (const key in value) {
          result[name + '[' + key + ']'] = value[key];
        }
      } else {
        result[name] = value;
      }
    }
    return result;
  }

  private filterQueryParams(data: { [index: string]: any }): { [index: string]: any } {
    for (const key in data) {
      if ([undefined, '', null].indexOf(data[key]) >= 0) {
        delete data[key];
      }
    }
    return data;
  }

  private convertQueryParams(data: { [index: string]: any }): { [index: string]: string } {
    for (const key in data) {
      if (typeof data[key] === 'boolean') {
        data[key] = data[key] ? 'true' : 'false';
      } else {
        data[key] = String(data[key]);
      }
    }
    return data;
  }
}
