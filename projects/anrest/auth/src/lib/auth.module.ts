import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { ANREST_HTTP_INTERCEPTORS } from '@anrest/api';

import { AnRestAuthConfig, ApiAuthConfig } from './auth.config';
import { AuthInterceptor } from './auth.interceptor';
import { AuthTokenProvider } from './token/auth-token.provider';
import { InMemoryAuthTokenProvider } from './token/in-memory-auth-token.provider';
import { AuthService} from './service/auth.service';
import { BasicAuthService } from './service/basic-auth.service';

const defaultConfig: ApiAuthConfig = {
  url: '/login',
  service: BasicAuthService,
  tokenProvider: InMemoryAuthTokenProvider,
  identityField: 'username',
  passwordField: 'password',
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    CookieService,
    {
      provide: AnRestAuthConfig,
      useValue: defaultConfig,
    },
    {
      provide: AuthTokenProvider,
      useClass: defaultConfig.tokenProvider
    },
    {
      provide: AuthService,
      useClass: defaultConfig.service
    },
    {
      provide: ANREST_HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AnRestAuthModule {
  static config(config: ApiAuthConfig = defaultConfig): ModuleWithProviders {
    return {
      ngModule: AnRestAuthModule,
      providers: [
        CookieService,
        {
          provide: AnRestAuthConfig,
          useValue: config,
        },
        {
          provide: AuthTokenProvider,
          useClass: config.tokenProvider
        },
        {
          provide: AuthService,
          useClass: config.service
        },
        {
          provide: ANREST_HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    };
  }
}
