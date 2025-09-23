import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedLibraryModule } from 'shared';
import { CitasDialogService } from '../../services/citas-dialog.service';

export interface SolicitudDebitoCuenta {
  numeroPagare: number;
  tipoCredito: string;
  fechaAdjudicado: Date;
  deudaInicial: number;
  saldo: number;
  nombreEstado: string;
  estado: string;
}

@Component({
  selector: 'app-prestamos-judiciales',
   imports: [CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    SharedLibraryModule
  ],
  templateUrl: './prestamos-judiciales.component.html',
  styleUrl: './prestamos-judiciales.component.scss'
})
export class PrestamosJudicialesComponent {

displayedColumns: string[] = [
     'numeroPagare',
     'tipoCredito',
     'fechaAdjudicado',
     'deudaInicial',
     'saldo',
     'nombreEstado',
     'estado',
     'detalle',
     'cargo'
   ];

   dataSource = new MatTableDataSource<SolicitudDebitoCuenta>([
     {
       numeroPagare: 10184,
       tipoCredito: 'CREDIAMIGO HIPOTECARIO',
       fechaAdjudicado: new Date('2025-04-07'),
       deudaInicial: 2000.20,
       saldo: 100,
       nombreEstado: 'Moroso',
       estado: 'Ingresado'
     }
   ]);

   @ViewChild(MatPaginator) paginator!: MatPaginator;

   constructor(private citasDialogService: CitasDialogService) {}

   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
   }


}

