import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { AnRestConfig, ApiConfig } from '@anrest/api';
import { Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { CacheEngine } from './engine/engine';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(
    private cache: CacheEngine,
    @Inject(AnRestConfig) protected readonly apiConfig: ApiConfig,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const path = request.urlWithParams.slice(this.apiConfig.uri.length);
    if (request.method !== 'GET') {
      this.cache.remove(path);
      return next.handle(request);
    }
    return this.cache.get(path).pipe(
      mergeMap((item: any) => {
        if (item) {
          return of(new HttpResponse({
            body: item.data,
            status: 200,
            headers: (new HttpHeaders()).set('Content-Type', item.type),
            url: request.url
          }));
        }
        return next.handle(request).pipe(
          tap((response: HttpResponse<any>) => {
            if (response.body) {
              this.cache.set(path, response);
            }
          })
        );
      })
    );
  }
}
