import { Routes } from '@angular/router';
import { LoginPageComponent } from 'shared';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        // pathMatch: 'full',
        path: '',
        loadChildren: () => import('./features/citas/citas.module').then(m => m.CitasModule)
    },
];
