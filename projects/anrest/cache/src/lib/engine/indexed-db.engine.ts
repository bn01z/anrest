import { Inject, Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap, shareReplay } from 'rxjs/operators';

import { AnRestCacheConfig, ApiCacheConfig } from '../cache.config';
import { AnRestCacheEngine } from './engine';

@Injectable()
export class IndexedDbCacheEngine implements AnRestCacheEngine {

  private db: Observable<any>;

  constructor(
    @Inject(AnRestCacheConfig) protected readonly config: ApiCacheConfig
  ) {
    this.db = this.openDB();
  }

  get(key: string): any {
    return this.db.pipe(
      mergeMap((db) => {
        return Observable.create((observer) => {
          db.transaction(['cache']).objectStore('cache').get(key).onsuccess = (event) => {
            if (!event.target.result) {
              observer.next(undefined);
            } else if (Date.now() > this.config.ttl + event.target.result.time) {
              this.remove(key);
              observer.next(undefined);
            } else {
              observer.next(event.target.result);
            }
          };
        });
      })
    );
  }

  remove(key: string) {
    this.db.subscribe((db) => {
      db.transaction(['cache'], 'readwrite').objectStore('cache').delete(key);
    });
  }

  set(key: string, object: HttpResponse<any>, alias?: string) {
    this.db.subscribe((db) => {
      const store = db.transaction(['cache'], 'readwrite').objectStore('cache');
      const data = {
        path: key,
        type: object.headers.get('content-type'),
        data: object.body,
        time: Date.now()
      };
      store.add(data);
    });
  }

  clear() {
    this.db.subscribe((db) => {
      db.transaction(['cache'], 'readwrite').objectStore('cache').clear();
    });
  }

  private openDB() {
    return Observable.create((observer) => {
      const request = indexedDB.open('anrest', 1);
      request.onupgradeneeded =  () => {
        const db = request.result;
        const store = db.createObjectStore('cache', {keyPath: 'path'});
        store.createIndex('by_path', 'path');
        store.createIndex('by_type', 'type');
        store.createIndex('by_data', 'data');
        store.createIndex('by_time', 'time');
      };
      request.onsuccess = () => observer.next(request.result);
    }).pipe(
      shareReplay()
    );
  }
}
