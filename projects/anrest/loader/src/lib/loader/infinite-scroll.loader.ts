import { Type } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Collection, AnRestHttpClient } from '@anrest/api';

import { Loader } from './loader';
import { ApiLoaderConfig } from '../loader.config';

export class InfiniteScrollLoader extends Loader {

  private loadMoreSubject: BehaviorSubject<Observable<Collection<any>>>;
  private loadAllSubject: BehaviorSubject<Observable<Collection<any>>>;
  private lastLoadMore: Observable<Collection<any>>;
  private lastLoadAll: Observable<Collection<any>>;
  private lastData: Collection<any>;
  private preloadedData: Observable<Collection<any>>;

  constructor(http: AnRestHttpClient, entityType: Type<any>, config: ApiLoaderConfig, private preload = false) {
    super(http, entityType, config);
  }

  loadAll() {
    if (!this.hasMore) {
      return;
    }
    this.loadAllSubject.next(this.lastData.loadAll());
  }

  loadMore() {
    if (!this.hasMore || this.isLoading) {
      return;
    }
    this.loadMoreSubject.next(this.preload ? this.preloadedData : this.lastData.loadMore());
  }

  get hasMore(): boolean {
    return this.lastData && this.lastData.hasMore();
  }

  protected onLoad(data: Collection<any>) {
    this.lastData = data;
    if (this.preload && data.hasNext()) {
      this.preloadedData = data.loadMore().pipe(shareReplay(1));
      this.preloadedData.subscribe();
    }
  }

  protected setupObservables(): Observable<any> {
    this.loadMoreSubject = new BehaviorSubject<Observable<Collection<any>>>(undefined);
    this.loadAllSubject = new BehaviorSubject<Observable<Collection<any>>>(undefined);

    return combineLatest(this.loadMoreSubject, this.loadAllSubject, super.setupObservables()).pipe(
      map(([loadMore, loadAll, filter]: [Observable<Collection<any>>, Observable<Collection<any>>, any]) => {
        if (loadMore === this.lastLoadMore) {
          loadMore = undefined;
        } else {
          this.lastLoadMore = loadMore;
        }
        if (loadAll === this.lastLoadAll) {
          loadAll = undefined;
        } else {
          this.lastLoadAll = loadAll;
        }
        return [loadMore, loadAll, filter];
      })
    );
  }

  protected getList(
    [loadMore, loadAll, filter]: [Observable<Collection<any>>, Observable<Collection<any>>, any]
  ): Observable<Collection<any>> {
    return loadAll || loadMore || super.getList(filter);
  }
}
