import { Routes } from '@angular/router';
import { AprobarSolicitudDebitoCuentaComponent } from './pages/aprobar-solicitud-debito-cuenta/aprobar-solicitud-debito-cuenta.component';
import { PrestamosJudicialesComponent } from './pages/prestamos-judiciales/prestamos-judiciales.component';
import { PrestamosJudicialesDetalleComponent } from './pages/prestamos-judiciales-detalle/prestamos-judiciales-detalle.component';
import { CrearCargoComponent } from './pages/crear-cargo/crear-cargo.component';
import { PrestamoMaestroFormComponent } from './pages/prestamo-maestro-form/prestamo-maestro-form.component';

export const cobranzasRoute: Routes = [
  {
    path: '',
    component: PrestamosJudicialesComponent,
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
    path: 'prestamos-judiciales/detalle/:id',
    component: PrestamosJudicialesDetalleComponent,
  },
  {
    path: 'prestamos-judiciales/crear-cargo/:id',
    component: CrearCargoComponent,
  },
  {
    path: 'prestamo-maestro',
    component: PrestamoMaestroFormComponent
  },
];