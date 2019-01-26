import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AnRestCacheEngine {
  get(key: string): Observable<any>;
  set(key: string, object: HttpResponse<any>, alias?: string);
  remove(key: string);
  clear();
}

@Injectable()
export abstract class CacheEngine implements AnRestCacheEngine {
  abstract get(key: string): Observable<any>;
  abstract remove(key: string);
  abstract set(key: string, object: HttpResponse<any>, alias?: string);
  abstract clear();
}





