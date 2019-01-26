import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AuthTokenProvider } from './auth-token.provider';


@Injectable()
export class CookieAuthTokenProvider extends AuthTokenProvider {
  private static readonly tokenName = 'anrest_auth_token';
  private static readonly expireTimeName = 'anrest_auth_expire_time';

  constructor(private cookieService: CookieService) {
    super();
    this.init(
      cookieService.check(CookieAuthTokenProvider.expireTimeName) ? Number(cookieService.get(CookieAuthTokenProvider.expireTimeName)) : 0
    );
  }

  get(): string {
    return this.cookieService.get(CookieAuthTokenProvider.tokenName);
  }

  set(token: string, expireIn?: number) {
    this.cookieService.set(CookieAuthTokenProvider.tokenName, token);
    this.expired.next(false);
    if (expireIn) {
      this.cookieService.set(CookieAuthTokenProvider.expireTimeName, String(Date.now() + expireIn * 1000));
      this.setExpireTimer(expireIn);
    }
  }

  remove() {
    this.cookieService.delete(CookieAuthTokenProvider.tokenName);
    this.cookieService.delete(CookieAuthTokenProvider.expireTimeName);
  }

  isSet(): boolean {
    return this.cookieService.check(CookieAuthTokenProvider.tokenName);
  }
}
