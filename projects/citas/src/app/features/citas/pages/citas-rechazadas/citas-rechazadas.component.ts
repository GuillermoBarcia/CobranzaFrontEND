import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedLibraryModule } from 'shared';
import { Sapcedi } from '../../../../../../../shared/src/lib/models/sapcedi.model';

@Component({
  standalone: true,
  selector: 'app-citas-rechazadas',
  imports: [
    CommonModule,
    RouterModule ,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    SharedLibraryModule
  ],
  templateUrl: './citas-rechazadas.component.html',
  styleUrl: './citas-rechazadas.component.scss'
})
export class CitasRechazadasComponent {

 displayedColumns: string[] = [
  'numeroConsolidacion',
  'proveedor',
  'fechaPropuesta',
  'horaInicialPropuesta',
  'horaFinPropuesta',
  'observacion',
  'aprobar'
];

// Datos de ejemplo usando MatTableDataSource
dataSource = new MatTableDataSource<Sapcedi>([
{
  numeroConsolidacion: 10184,
  proveedor: 'TROPICALIMENTOS S.A',
  fechaPropuesta: new Date('2025-04-07'),
  horaInicialPropuesta: '06:00',
  horaFinPropuesta: '07:30',
  observacion: 'POR PRUEBA'
},
{
  numeroConsolidacion: 10185,
  proveedor: 'DISTRIBUIDORA ANDINA',
  fechaPropuesta: new Date('2025-04-07'),
  horaInicialPropuesta: '09:00',
  horaFinPropuesta: '10:30',
  observacion: 'PRUEBA 2'
},
// Más registros...
]);

@ViewChild(MatPaginator) paginator!: MatPaginator;
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}
}
