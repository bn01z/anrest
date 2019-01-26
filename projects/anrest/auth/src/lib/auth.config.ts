import { InjectionToken } from '@angular/core';

export interface ApiAuthConfig {
  url?: string;
  tokenProvider?: any;
  service?: any;
  options?: { [index: string]: any };
  identityField?: string;
  passwordField?: string;
}

export const AnRestAuthConfig = new InjectionToken<ApiAuthConfig>('anrest.auth_config');
