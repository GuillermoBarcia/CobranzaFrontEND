import { Routes } from '@angular/router';
import { DefaultComponent } from './components/default/default.component';
import { NuevaCitaComponent } from './pages/nueva-cita/nueva-cita.component';

export const citasRoute: Routes = [
   
    {
        path: 'crear',
        component: NuevaCitaComponent,
    },
    {
        path: '',
        component: DefaultComponent,
    },
];
