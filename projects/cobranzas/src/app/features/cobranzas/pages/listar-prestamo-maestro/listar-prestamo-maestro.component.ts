import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { BreadCrumbComponent, SearchComponent, SharedLibraryModule, PrestamoPorIdentificacionRequest, PrestamoMaestroService, CommonDialogsService, PrestamoPorIdentificacionResponse, PrestamosIngresadosResponse } from 'shared';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


export interface PrestamoJudicial {
  numeroPagare: string;
  identificacion: string;
  nombresApellidos: string;
  montoAprobado: number;
  montoDesembolsado: number;
  fechaAdjudicacion: Date;
  fechaVencimiento: Date;
  nombreOficina: string;
}


@Component({
  selector: 'app-listar-prestamo-maestro',
   standalone: true,
  imports: [
    CommonModule,
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
  templateUrl: './listar-prestamo-maestro.component.html',
  styleUrl: './listar-prestamo-maestro.component.scss'
})
export class ListarPrestamoMaestroComponent implements OnInit {
  displayedColumns: string[] = [
    'numeroPagare',
    'identificacion',
    'nombresApellidos',
    'montoAprobado',
    'montoDesembolsado',
    'fechaAdjudicacion',
    'fechaVencimiento',
    'nombreOficina',
    'cargo'
  ];

  dataSource = new MatTableDataSource<PrestamoJudicial>([]);
  searchForm!: FormGroup;
  isPagareActive = false;
  isCedulaActive = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private prestamoMaestroService: PrestamoMaestroService,
    private readonly dialogService: CommonDialogsService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

   clearField(field: string): void {
    this.searchForm.get(field)?.setValue('');
    if (field === 'p') {
      this.isPagareActive = false;
      if (this.isCedulaActive) {
        this.searchForm.get('cedula')?.enable();
      }
    } else if (field === 'cedula') {
      this.isCedulaActive = false;
      if (this.isPagareActive) {
        this.searchForm.get('p')?.enable();
      }
    }
    this.lockFields();
  }

  private initializeForm(): void {
    this.searchForm = this.fb.group({
      p: ['', [Validators.pattern('[0-9]*')]],
      cedula: ['', [Validators.pattern('[0-9]*')]]
    });
  }

   filterInput(field: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^0-9]/g, ''); // Elimina todo excepto números
    this.searchForm.get(field)?.setValue(value, { emitEvent: false }); // Actualiza el valor sin disparar eventos adicionales

    const pValue = this.searchForm.get('p')?.value;
    const cedulaValue = this.searchForm.get('cedula')?.value;

    this.isPagareActive = !!pValue;
    this.isCedulaActive = !!cedulaValue;

    // Si ambos campos tienen valor, prioriza el último editado y borra el otro
    if (this.isPagareActive && this.isCedulaActive) {
      if (field === 'cedula') {
        this.searchForm.get('p')?.setValue('');
        this.isPagareActive = false;
      } else if (field === 'p') {
        this.searchForm.get('cedula')?.setValue('');
        this.isCedulaActive = false;
      }
    }

    // Bloquea el otro campo
    this.lockFields();
  }

  onInputChange(field: string): void {
    const pValue = this.searchForm.get('p')?.value;
    const cedulaValue = this.searchForm.get('cedula')?.value;

    this.isPagareActive = !!pValue;
    this.isCedulaActive = !!cedulaValue;

    // Asegura que solo un campo esté activo a la vez
    if (this.isPagareActive && this.isCedulaActive) {
      if (field === 'cedula') {
        this.searchForm.get('p')?.setValue('');
        this.isPagareActive = false;
      } else if (field === 'p') {
        this.searchForm.get('cedula')?.setValue('');
        this.isCedulaActive = false;
      }
    }

    // Bloquea el otro campo
    this.lockFields();
  }

  onSearch(): void {
    const numeroPrestamo = this.searchForm.get('p')?.value;
    const cedula = this.searchForm.get('cedula')?.value;

    if (!numeroPrestamo && !cedula) {
      this.dialogService.showCustomInfoMessageOrGeneric('Por favor, ingrese el número de pagaré o una cédula.');
      return;
    }

    const request: PrestamoPorIdentificacionRequest = {
      identificacion: cedula || '',
      numeroPrestamo: numeroPrestamo || ''
    };

    this.prestamoMaestroService.getPrestamosPorIdentificacionNumero(request).subscribe({
      next: (response: PrestamoPorIdentificacionResponse) => {
        if (response.estadoTransaccion && response.jsonObject.length > 0) {
          const data = response.jsonObject.map(item => ({
            numeroPagare: item.numeroPagare,
            identificacion: item.secuencialClienteNavigation.identificacion,
            nombresApellidos: `${item.secuencialClienteNavigation.nombre} ${item.secuencialClienteNavigation.apellido}`,
            montoAprobado: item.montoAprobado,
            montoDesembolsado: item.montoDesembolsado,
            fechaAdjudicacion: new Date(item.fechaAdjudicacion),
            fechaVencimiento: new Date(item.fechaVencimiento),
            nombreOficina: item.secuencialOficinaNavigation.nombre
          }));
          this.dataSource.data = data;
        } else {
          // alert('No se encontraron datos para los criterios ingresados.');
          this.dialogService.showSimpleNoContent();
          this.dataSource.data = [];
        }
      },
      error: (err) => {
        console.error('Error al buscar préstamos', err);
        // alert('Error al buscar préstamos: ' + err.message);
        this.dialogService.showDataLoadingError('Préstamos',  err.message)
        this.dataSource.data = [];
      }
    });
  }

  private lockFields(): void {
    const pControl = this.searchForm.get('p');
    const cedulaControl = this.searchForm.get('cedula');
    if (this.isPagareActive) {
      cedulaControl?.disable();
      pControl?.enable();
    } else if (this.isCedulaActive) {
      pControl?.disable();
      cedulaControl?.enable();
    } else {
      pControl?.enable();
      cedulaControl?.enable();
    }
  }
}