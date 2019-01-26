import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Collection } from '@anrest/api';

import { Loader } from './loader';

export class PaginationLoader extends Loader {

  private pageSubject: BehaviorSubject<Observable<Collection<any>>>;
  private lastPagination: Observable<Collection<any>>;
  private lastData: Collection<any>;

  loadFirst() {
    if (!this.hasFirst) {
      return;
    }
    this.pageSubject.next(this.lastData.firstPage());
  }

  loadPrevious() {
    if (!this.hasPrevious) {
      return;
    }
    this.pageSubject.next(this.lastData.previousPage());
  }

  loadNext() {
    if (!this.hasNext) {
      return;
    }
    this.pageSubject.next(this.lastData.nextPage());
  }

  loadLast() {
    if (!this.hasLast) {
      return;
    }
    this.pageSubject.next(this.lastData.lastPage());
  }

  get hasFirst() {
    return this.lastData && this.lastData.hasFirst();
  }

  get hasPrevious() {
    return this.lastData && this.lastData.hasPrevious();
  }

  get hasNext() {
    return this.lastData && this.lastData.hasNext();
  }

  get hasLast() {
    return this.lastData && this.lastData.hasLast();
  }

  protected onLoad(data: Collection<any>) {
    this.lastData = data;
  }

  protected setupObservables(): Observable<any> {
    this.pageSubject = new BehaviorSubject<Observable<Collection<any>>>(undefined);

    return combineLatest(this.pageSubject, super.setupObservables()).pipe(
      map(([page, filter]: [Observable<Collection<any>>, any]) => {
        if (page === this.lastPagination) {
          page = undefined;
        } else {
          this.lastPagination = page;
        }
        return [page, filter];
      })
    );
  }

  protected getList([page, filter]: [Observable<Collection<any>>, any]): Observable<Collection<any>> {
    return page || this.http.getList(this.entityType, filter);
  }
}
