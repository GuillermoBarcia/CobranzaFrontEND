import { Routes } from '@angular/router';
import { AprobarSolicitudDebitoCuentaComponent } from './pages/aprobar-solicitud-debito-cuenta/aprobar-solicitud-debito-cuenta.component';
import { PrestamosJudicialesComponent } from './pages/prestamos-judiciales/prestamos-judiciales.component';
import { PrestamosJudicialesDetalleComponent } from './pages/prestamos-judiciales-detalle/prestamos-judiciales-detalle.component';
import { CrearCargoComponent } from './pages/crear-cargo/crear-cargo.component';
import { PrestamoMaestroFormComponent } from './pages/prestamo-maestro-form/prestamo-maestro-form.component';
import { ListarPrestamoMaestroComponent } from './pages/listar-prestamo-maestro/listar-prestamo-maestro.component';
import { DetalleGestionAbogadoComponent } from './pages/detalle-gestion-abogado/detalle-gestion-abogado.component';
import { PrestamoDemandaJudicialFormComponent } from './pages/prestamo-demanda-judicial-form/prestamo-demanda-judicial-form.component';

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
    path: 'listar-prestamos-maestro',
    component: ListarPrestamoMaestroComponent,
  },
  {
    path: 'prestamos-judiciales/detalle/:id',
    component: PrestamosJudicialesDetalleComponent,
  },
   {
    path: 'prestamos-judiciales/detalle-abogado/:id',
    component: DetalleGestionAbogadoComponent,
  },
  {
    path: 'listar-prestamos-maestro/crear-cargo/:id',
    component: CrearCargoComponent,
  },
  {
    path: 'prestamo-maestro',
    component: PrestamoMaestroFormComponent
  },
   {
    path: 'prestamo-demanda-judicial-form',
    component: PrestamoDemandaJudicialFormComponent
  }
];