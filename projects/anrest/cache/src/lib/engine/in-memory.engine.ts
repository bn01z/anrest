import { Inject, Injectable } from '@angular/core';
import { ObjectCollector } from '@anrest/api';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AnRestCacheConfig, ApiCacheConfig } from '../cache.config';
import { AnRestCacheEngine } from './engine';


@Injectable()
export class InMemoryCacheEngine implements AnRestCacheEngine {

  private times: { [index: string]: number } = {};

  private aliases: { [index: string]: string } = {};

  constructor(
    private readonly collector: ObjectCollector,
    @Inject(AnRestCacheConfig) protected readonly config: ApiCacheConfig
  ) {}

  get(key: string): Observable<any> {
    const time = this.aliases[key] ? this.times[this.aliases[key]] : this.times[key];
    return of(time && (Date.now() <= this.config.ttl + time) ? this.collector.get(key) : null);
  }

  set(key: string, object: HttpResponse<any>, alias?: string) {
    this.times[key] = Date.now();
    if (alias) {
      this.aliases[alias] = key;
    }
  }

  clear() {
    this.collector.clear();
  }

  remove(id: string) {
    this.collector.remove(id);
  }
}
