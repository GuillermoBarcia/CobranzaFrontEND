import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    
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
  ],
};