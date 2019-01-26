import { Injectable } from '@angular/core';

import { AuthTokenProvider } from './auth-token.provider';


@Injectable()
export class LocalStorageAuthTokenProvider extends AuthTokenProvider {
  private static readonly tokenName = 'anrest:auth_token';
  private static readonly expireTimeName = 'anrest:auth_expire_time';

  constructor() {
    super();
    super.init(Number(localStorage.getItem(LocalStorageAuthTokenProvider.expireTimeName)));
  }

  get(): string {
    return localStorage.getItem(LocalStorageAuthTokenProvider.tokenName);
  }

  set(token: string, expireIn?: number) {
    localStorage.setItem(LocalStorageAuthTokenProvider.tokenName, token);
    this.expired.next(false);
    if (expireIn) {
      localStorage.setItem(LocalStorageAuthTokenProvider.expireTimeName, String(Date.now() + expireIn * 1000));
      this.setExpireTimer(expireIn);
    }
  }

  remove() {
    localStorage.removeItem(LocalStorageAuthTokenProvider.tokenName);
    localStorage.removeItem(LocalStorageAuthTokenProvider.expireTimeName);
  }

  isSet(): boolean {
    return localStorage.getItem(LocalStorageAuthTokenProvider.tokenName) != null;
  }
}
