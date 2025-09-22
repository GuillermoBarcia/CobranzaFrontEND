import { Routes } from '@angular/router';
// import { DefaultComponent } from './components/default/default.component';
import { NuevaCitaComponent } from './pages/nueva-cita/nueva-cita.component';
import { CitasRechazadasSapComponent } from './pages/citas-rechazadas-sap/citas-rechazadas-sap.component';
import { PlanificacionCitaComponent } from './pages/planificacion-cita/planificacion-cita.component';
import { CitasRechazadasComponent } from './pages/citas-rechazadas/citas-rechazadas.component';
import { CitasPendientesComponent } from './pages/citas-pendientes/citas-pendientes.component';
import { AprobarSolicitudDebitoCuentaComponent } from './pages/aprobar-solicitud-debito-cuenta/aprobar-solicitud-debito-cuenta.component';
import { PrestamosJudicialesComponent } from './pages/prestamos-judiciales/prestamos-judiciales.component';
import { PrestamosJudicialesDetalleComponent } from './pages/prestamos-judiciales-detalle/prestamos-judiciales-detalle.component';

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
  {
    path: 'aprobar-solicitud-debito-cuenta',
    component: AprobarSolicitudDebitoCuentaComponent,
  },
    {
    path: 'prestamos-judiciales',
    component: PrestamosJudicialesComponent,
  },
   {
    path: 'prestamos-judiciales-detalle',
    component: PrestamosJudicialesDetalleComponent,
  },
];
