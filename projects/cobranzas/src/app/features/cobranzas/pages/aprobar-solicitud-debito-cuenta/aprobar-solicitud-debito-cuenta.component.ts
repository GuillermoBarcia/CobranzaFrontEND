import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {  BreadCrumbComponent, SearchComponent, SharedLibraryModule } from "shared";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CobranzaDialogService } from '../../services/cobranza-dialog.service';

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
    ReactiveFormsModule,
    BreadCrumbComponent,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    SharedLibraryModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDatepickerToggle,
    SearchComponent
  ],
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

   constructor(private citasDialogService: CobranzaDialogService) {}

   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
   }

   aprobarCita(): void {
     this.citasDialogService.openAprobarCitaDialog( {
       titulo: 'Aprobar Solicitud otros Cargos',
       mensaje: `¿Estás seguro de aprobar la solicitud para otros cargos?`,
       textoConfirmar: 'Aceptar',
       textoCancelar: 'Cancelar'
     }).then(confirmado => {
       if (confirmado) {
         this.procesarAprobacion();
       }
     });
   }

   private procesarAprobacion(): void {
     // lógica para aprobar la cita
     console.log('Cita aprobada:');
   }
}
