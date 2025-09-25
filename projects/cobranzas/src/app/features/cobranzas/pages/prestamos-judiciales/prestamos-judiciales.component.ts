import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BreadCrumbComponent, SharedLibraryModule } from 'shared';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from "../../../../shared/components/search/search.component";
import { CobranzaDialogService } from '../../services/cobranza-dialog.service';

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
    ReactiveFormsModule,
    BreadCrumbComponent,
    RouterModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    SharedLibraryModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SearchComponent
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

   constructor(private citasDialogService: CobranzaDialogService) {}

   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
   }


}

