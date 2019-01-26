import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { filter, shareReplay } from 'rxjs/operators';

@Injectable()
export abstract class AuthTokenProvider {
  private timer: Subscription;
  public readonly expired: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  abstract get(): string;
  abstract set(token: string, expireIn?: number);
  abstract remove();
  abstract isSet(): boolean;

  protected init(expiresAt?: number) {
    expiresAt = expiresAt || 0;
    this.expired
      .pipe(
        shareReplay(1),
        filter((expired) => expired)
      )
      .subscribe(() => this.remove());
    this.setExpireTimer(expiresAt > Date.now() ? expiresAt - Date.now() : 0);
  }

  protected setExpireTimer(seconds: number) {
    if (this.timer) {
      this.timer.unsubscribe();
    }
    this.timer = timer(seconds * 1000).subscribe(() => this.expired.next(true));
  }
}
