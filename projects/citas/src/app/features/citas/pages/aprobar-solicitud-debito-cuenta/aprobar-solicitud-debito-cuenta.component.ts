import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {  SharedLibraryModule } from "shared";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CitasDialogService } from '../../services/citas-dialog.service';
import { Sapcedi } from '../../../../../../../shared/src/lib/models/sapcedi.model';

export interface SolicitudDebitoCuenta {
  numeroPagare: number;
  prestamo: number;
  cuenta: string;
  fechaMaquina: Date;
  fechaSistema: Date;
  usuario: string;
  estado: string;
}


@Component({
  standalone: true,
  selector: 'app-aprobar-solicitud-debito-cuenta',
  imports: [CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    SharedLibraryModule],
  templateUrl: './aprobar-solicitud-debito-cuenta.component.html',
  styleUrl: './aprobar-solicitud-debito-cuenta.component.scss'
})



export class AprobarSolicitudDebitoCuentaComponent {
 displayedColumns: string[] = [
     'numeroPagare',
     'prestamo',
     'cuenta',
     'fechaMaquina',
     'fechaSistema',
     'usuario',
     'estado',
     'aprobar'
   ];

   dataSource = new MatTableDataSource<SolicitudDebitoCuenta>([
     {
       numeroPagare: 10184,
       prestamo: 10184,
       cuenta: '100274124',
       fechaMaquina: new Date('2025-04-07'),
       fechaSistema: new Date('2025-04-07'),
       usuario: 'Guillermo',
       estado: 'Ingresado'
     },
     {
       numeroPagare: 10185,
       prestamo: 10185,
       cuenta: '200312321',
       fechaMaquina: new Date('2025-04-07'),
       fechaSistema: new Date('2025-04-07'),
       usuario: 'Javier',
       estado: 'Ingresado'
     },
   ]);

   @ViewChild(MatPaginator) paginator!: MatPaginator;

   constructor(private citasDialogService: CitasDialogService) {}

   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
   }

   aprobarCita(cita: Sapcedi): void {
     this.citasDialogService.openAprobarCitaDialog(cita, {
       titulo: 'Aprobar Débito de Cuenta',
       mensaje: `¿Estás seguro de aprobar la solicitud para debitar a la cuenta?`,
       textoConfirmar: 'Aceptar',
       textoCancelar: 'Cancelar'
     }).then(confirmado => {
       if (confirmado) {
         this.procesarAprobacion(cita);
       }
     });
   }

   private procesarAprobacion(cita: Sapcedi): void {
     // lógica para aprobar la cita
     console.log('Cita aprobada:', cita.numeroConsolidacion);
   }
}
