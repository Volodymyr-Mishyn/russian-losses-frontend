import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import localeUk from '@angular/common/locales/uk';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    provideAnimations(),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    { provide: MAT_DATE_LOCALE, useValue: 'uk-UA' },
  ],
};
