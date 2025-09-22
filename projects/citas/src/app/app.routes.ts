import { Routes } from '@angular/router';
import { LoginPageComponent } from 'shared';
import { NuevaCitaComponent } from './features/citas/pages/nueva-cita/nueva-cita.component';

export const routes: Routes = [
    {
        path: 'nueva-cita',
        component: NuevaCitaComponent,
    },
    {
        // pathMatch: 'full',
        path: '',
        loadChildren: () => import('./features/citas/citas.module').then(m => m.CitasModule)
    },
];
