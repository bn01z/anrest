import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AnRestCacheEngine } from './engine';

@Injectable()
export class NoCacheEngine implements AnRestCacheEngine {
  get(key: string): Observable<any> { return of(undefined); }
  set(key: string, object: HttpResponse<any>, alias?: string) {}
  clear() {}
  remove(id: string) {}
}
