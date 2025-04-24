import { Routes } from '@angular/router';
// import { DefaultComponent } from './components/default/default.component';
import { NuevaCitaComponent } from './pages/nueva-cita/nueva-cita.component';
import { CitasRechazadasSapComponent } from './pages/citas-rechazadas-sap/citas-rechazadas-sap.component';
import { PlanificacionCitaComponent } from './pages/planificacion-cita/planificacion-cita.component';
import { CitasRechazadasComponent } from './pages/citas-rechazadas/citas-rechazadas.component';
import { CitasPendientesComponent } from './pages/citas-pendientes/citas-pendientes.component';

export const citasRoute: Routes = [

  {
    path: 'nueva-cita/:id',
    component: PlanificacionCitaComponent,
  },
  {
      path: '',
      component: NuevaCitaComponent,
  },
  {
    path: 'citas-canceladas-sap',
    component: CitasRechazadasSapComponent,
  },
  {
  path: 'citas-canceladas',
  component: CitasRechazadasComponent,
  },
  {
    path: 'citas-pendientes',
    component: CitasPendientesComponent,
  },
];
