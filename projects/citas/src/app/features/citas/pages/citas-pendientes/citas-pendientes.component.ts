import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedLibraryModule } from 'shared';
import { Citas } from '../../../../../../../shared/src/lib/models/citas.model';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  standalone: true,
  selector: 'app-citas-pendientes',
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    SharedLibraryModule
  ],
  templateUrl: './citas-pendientes.component.html',
  styleUrl: './citas-pendientes.component.scss'
})
export class CitasPendientesComponent {
  displayedColumns: string[] = [
    'numeroConsolidacion',
    'proveedor',
    'fechaPropuesta',
    'horaInicialPropuesta',
    'horaFinPropuesta',
    'estado',
    'sap',
    'planificar',
    'rechazar'
  ];

   dataSource = new MatTableDataSource<Citas>([
      {
        numeroConsolidacion: 10184,
        proveedor: 'TROPICALIMENTOS S.A',
        fechaPropuesta: new Date('2025-04-07'),
        horaInicialPropuesta: '06:00',
        horaFinPropuesta: '07:30',
        estado: 'Solicitado'
      },
      {
        numeroConsolidacion: 10185,
        proveedor: 'DISTRIBUIDORA ANDINA',
        fechaPropuesta: new Date('2025-04-07'),
        horaInicialPropuesta: '09:00',
        horaFinPropuesta: '10:30',
        estado: 'Solicitado'
      },
    ]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
      @Inject(FuseConfirmationService) private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }


    rechazarCita(cita: Citas): void {
      const confirmation = this._fuseConfirmationService.open({
        title: 'Detalle por qué rechaza la cita',
        message: '',
        form: {
          campoObservacion: {
            type: 'textarea',
            label: 'Observación',
            value: '',
            validators: [],
          }
        },
        actions: {
          confirm: {
            label: 'Guardar',
            color: 'warn'
          },
          cancel: {
            label: 'Cerrar'
          }
        },
        dismissible: true,
        icon: {
          show: false
        }
      } as any); // ✅ esto permite usar 'form'


      confirmation.afterClosed().subscribe((result: any) => {
        if (result && result.campoObservacion) {
          console.log('Cita rechazada:', cita.numeroConsolidacion);
          console.log('Observación:', result.campoObservacion);
          // Aquí podrías enviar la observación al backend si es necesario
        }
      });
    }
}
