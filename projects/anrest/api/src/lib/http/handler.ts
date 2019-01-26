import { InjectionToken } from '@angular/core';
import { HttpBackend, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function anrestHandlerFactory(backend: HttpBackend,
                              interceptors: HttpInterceptor[] | null = [],
                              basicInterceptors: HttpInterceptor[] | null = []
): HttpHandler {
  if (!interceptors && !basicInterceptors) {
    return backend;
  }
  return (interceptors || []).reduceRight(
    (next, interceptor) => new AnRestHttpHandler(next, interceptor), (basicInterceptors || []).reduceRight(
      (next, interceptor) => new AnRestHttpHandler(next, interceptor), backend));
}

export class AnRestHttpHandler implements HttpHandler {
  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}

export const ANREST_HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>('ANREST_HTTP_INTERCEPTORS');
