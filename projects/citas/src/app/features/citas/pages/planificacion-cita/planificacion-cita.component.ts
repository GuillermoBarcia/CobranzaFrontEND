import { Component } from '@angular/core';
import { SharedLibraryModule } from 'shared';
import { FuseCardComponent } from '@fuse/components/card';

@Component({
  selector: 'app-planificacion-cita',
  imports: [SharedLibraryModule, FuseCardComponent],
  templateUrl: './planificacion-cita.component.html',
  styleUrl: './planificacion-cita.component.scss'
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PlanificacionCitaComponent {

}
