import { Routes } from '@angular/router';
import { PrestamosJudicialesComponent } from './features/cobranzas/pages/prestamos-judiciales/prestamos-judiciales.component';

export const routes: Routes = [
  {
    path: 'prestamos-judiciales',
    component: PrestamosJudicialesComponent,
  },
  {
    path: '',
    loadChildren: () => import('./features/cobranzas/cobranzas.module').then(m => m.CobranzasModule),
  },
];