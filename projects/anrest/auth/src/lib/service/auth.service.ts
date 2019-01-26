import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Auth } from './auth';

@Injectable()
export abstract class AuthService implements Auth {
  isSignedIn: boolean;
  info: any;
  abstract getToken(): string;
  abstract onSignedInChange(): BehaviorSubject<boolean>;
  abstract signOut();
  abstract setToken(token: string, expiresIn?: number);
  abstract signIn(auth?: any, password?: string): Observable<any>;
  abstract getUri(options?: any): string;
  abstract onExpire(callback: any);
}
