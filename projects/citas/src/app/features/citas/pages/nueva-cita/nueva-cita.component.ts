import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Proveedor, SharedLibraryModule } from 'shared';
import {MatIconModule} from '@angular/material/icon'
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'nueva-cita',
  templateUrl: './nueva-cita.component.html',
  styleUrl: './nueva-cita.component.scss',
  imports: [
    CommonModule,
    RouterModule ,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    SharedLibraryModule
  ],
})
export class NuevaCitaComponent {
  displayedColumns: string[] = ['registro', 'razonSocial', 'identificacion', 'estado', 'configurado', 'citas'];

  dataSource = new MatTableDataSource<Proveedor>([
    { registro: '001', razonSocial: 'Empresa A', identificacion: '12345', estado: true, configurado: true},
    { registro: '002', razonSocial: 'Empresa B', identificacion: '67890', estado: false, configurado: false },
    { registro: '003', razonSocial: 'Empresa C', identificacion: '12344', estado: true, configurado: true},
    { registro: '004', razonSocial: 'Empresa D', identificacion: '67895', estado: false, configurado: false },
    // Más datos...
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
