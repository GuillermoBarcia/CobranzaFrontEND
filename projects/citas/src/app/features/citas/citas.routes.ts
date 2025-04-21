import { Routes } from '@angular/router';
// import { DefaultComponent } from './components/default/default.component';
import { NuevaCitaComponent } from './pages/nueva-cita/nueva-cita.component';
import { PlanificacionCitaComponent } from './pages/planificacion-cita/planificacion-cita.component';

export const citasRoute: Routes = [
   
    {
        path: 'nueva-cita/:id',
        component: PlanificacionCitaComponent,
    },
    {
        path: '',
        component: NuevaCitaComponent,
    },
];
