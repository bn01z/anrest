import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { AnRestAuthConfig, ApiAuthConfig } from '../auth.config';
import { Auth } from './auth';
import { AuthTokenProvider } from '../token/auth-token.provider';

@Injectable()
export class BasicAuthService implements Auth {

  private readonly signedIn: BehaviorSubject<boolean>;

  constructor(
    protected http: HttpClient,
    protected tokenProvider: AuthTokenProvider,
    @Inject(AnRestAuthConfig) protected config: ApiAuthConfig
  ) {
    this.signedIn = new BehaviorSubject<boolean>(this.isSignedIn);
  }

  get isSignedIn(): boolean {
    return this.tokenProvider.isSet();
  }

  get token(): string {
    return this.getToken();
  }

  get info(): string {
    return this.getToken();
  }

  getToken(): string {
    return this.tokenProvider.get();
  }

  setToken(token: string, expiresIn?: number): void {
    this.tokenProvider.set(token, expiresIn);
    this.signedIn.next(true);
  }

  signOut(): void {
    this.tokenProvider.remove();
    this.signedIn.next(false);
  }

  onSignedInChange(): BehaviorSubject<boolean> {
    return this.signedIn;
  }

  signIn(auth: any, password: string): Observable<any> {
    const request = {};
    request[this.config.identityField || 'username'] = auth;
    request[this.config.passwordField || 'password'] = password;

    return this.http.post(this.config.url, request).pipe(tap((data: any) => this.setToken(data.token)));
  }

  getUri(options?: any): string {
    return this.config.url;
  }

  onExpire(callback: any): Subscription {
    return this.tokenProvider.expired.pipe(filter((expired) => expired)).subscribe(() => callback());
  }
}
