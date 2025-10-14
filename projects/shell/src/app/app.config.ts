import { ApplicationConfig, inject, isDevMode, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { provideFuse } from '@fuse/index';
import { provideIcons } from './core/icons/icons.provider';
// import { MockApiService } from 'shared';


export const appConfig: ApplicationConfig = {
  providers: [
      provideAnimations(),
      provideHttpClient(),
      provideRouter(
          routes,
          withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
      ),

      // Material Date Adapter
       // Material Date Adapter
    // 🗓️ Configuración para mostrar fechas en español (ej: 12 de junio de 2028)
    { provide: MAT_DATE_LOCALE, useValue: 'es-EC' },
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'd LLLL yyyy',
        },
        display: {
          dateInput: "d 'de' LLLL 'de' yyyy", // 👈 Formato literal en español
          monthYearLabel: 'LLLL yyyy',
          dateA11yLabel: 'd LLLL yyyy',
          monthYearA11yLabel: 'LLLL yyyy',
        },
      },
    },

      // Fuse
      // provideAuth(),
      provideIcons(),
      provideFuse({
        //   mockApi: {
        //       delay: 0,
        //       service: MockApiService,
        //   },
          fuse: {
              layout: 'classy',
              scheme: 'light',
              screens: {
                  sm: '600px',
                  md: '960px',
                  lg: '1280px',
                  xl: '1440px',
              },
              theme: 'theme-default',
              themes: [
                  {
                      id: 'theme-default',
                      name: 'Default',
                  },
                  {
                      id: 'theme-brand',
                      name: 'Brand',
                  },
                  {
                      id: 'theme-teal',
                      name: 'Teal',
                  },
                  {
                      id: 'theme-rose',
                      name: 'Rose',
                  },
                  {
                      id: 'theme-purple',
                      name: 'Purple',
                  },
                  {
                      id: 'theme-amber',
                      name: 'Amber',
                  },
              ],
          },
      }),
  ],
};
