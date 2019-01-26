import { Injectable } from '@angular/core';

import { AuthTokenProvider } from './auth-token.provider';


@Injectable()
export class InMemoryAuthTokenProvider extends AuthTokenProvider {
  private token: string = null;

  constructor() {
    super();
    this.init();
  }

  get(): string {
    return this.token;
  }

  set(token: string, expireIn?: number) {
    this.token = token;
    this.expired.next(false);
    if (expireIn) {
      this.setExpireTimer(expireIn);
    }
  }

  remove() {
    this.token = null;
  }

  isSet(): boolean {
    return this.token != null;
  }
}
