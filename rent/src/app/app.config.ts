import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { accessTokenInterceptor } from './services/access-token.interceptor';
import { unauthorizedInterceptor } from './services/unauthorized.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withFetch(),withInterceptors([accessTokenInterceptor,unauthorizedInterceptor]))]
};
