import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        // pathMatch: 'full',
        path: '',
        loadChildren: () => import('./features/citas/citas.module').then(m => m.CitasModule)
    },
];
