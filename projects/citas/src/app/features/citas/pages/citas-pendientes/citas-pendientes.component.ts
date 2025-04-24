import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedLibraryModule } from 'shared';
import { Citas } from '../../../../../../../shared/src/lib/models/citas.model';

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
}
