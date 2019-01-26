import { BehaviorSubject, Observable } from 'rxjs';

export interface Auth {
  isSignedIn: boolean;
  info: any;
  onSignedInChange(): BehaviorSubject<boolean>;
  getToken(): string;
  setToken(token: string);
  signIn(auth?: any, password?: string): Observable<any>;
  signOut();
  getUri(options?: any): string;
  onExpire(callback: any);
}
