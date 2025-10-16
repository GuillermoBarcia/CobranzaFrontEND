import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AbogadoGestor, AbogadoGestorOficinaService, TipoDocumento, TipoDocumentoService, TipoMateria, TipoMateriaService, TipoMedidaCautelar, TipoMedidaCautelarService, TipoTramite, TipoTramiteService, UnidadJudicial, UnidadJudicialService } from 'shared';

@Component({
  selector: 'app-prestamo-demanda-judicial-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatAutocompleteModule
  ],
  templateUrl: './prestamo-demanda-judicial-form.component.html',
  styleUrls: ['./prestamo-demanda-judicial-form.component.scss']
})
export class PrestamoDemandaJudicialFormComponent implements OnInit {
  form!: FormGroup;

  // Controls for filtering
  unidadJudicialControl = new FormControl();
  tipoTramiteControl = new FormControl();
  tipoMateriaControl = new FormControl();
  tipoMedidaCautelarControl = new FormControl();
  tipoDocumentoControl = new FormControl();
  abogadoControl = new FormControl();
  gestorControl = new FormControl();

  // Filtered lists
  filteredUnidadesJudiciales!: Observable<UnidadJudicial[]>;
  filteredTiposTramite!: Observable<TipoTramite[]>;
  filteredTiposMateria!: Observable<TipoMateria[]>;
  filteredTiposMedidaCautelar!: Observable<TipoMedidaCautelar[]>;
  filteredTiposDocumento!: Observable<TipoDocumento[]>;
  filteredAbogados!: Observable<AbogadoGestor[]>;
  filteredGestores!: Observable<AbogadoGestor[]>;

  // Full lists
  unidadesJudiciales: UnidadJudicial[] = [];
  tiposTramite: TipoTramite[] = [];
  tiposMateria: TipoMateria[] = [];
  tiposMedidaCautelar: TipoMedidaCautelar[] = [];
  tiposDocumento: TipoDocumento[] = [];
  abogados: AbogadoGestor[] = [];
  gestores: AbogadoGestor[] = [];

  constructor(
    private fb: FormBuilder,
    private unidadJudicialService: UnidadJudicialService,
    private tipoTramiteService: TipoTramiteService,
    private tipoMateriaService: TipoMateriaService,
    private tipoMedidaCautelarService: TipoMedidaCautelarService,
    private tipoDocumentoService: TipoDocumentoService,
    // private prestamoDemandaJudicialService: PrestamoDemandaJudicialService,
    private abogadoGestorOficinaService: AbogadoGestorOficinaService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadData();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      secuencialPrestamo: ['', Validators.required],
      fechaComiteMora: ['', Validators.required],
      fechaDemanda: ['', Validators.required],
      fechaEntregaExpediente: ['', Validators.required],
      saldoCapitalALaFecha: [0, [Validators.required, Validators.min(0)]],
      saldoTotalALaFecha: [0, [Validators.required, Validators.min(0)]],
      secuencialUnidadJudicial: ['', Validators.required],
      codigoTramite: ['', Validators.required],
      codigoMateria: ['', Validators.required],
      codigoMedidaCautelar: ['', Validators.required],
      porcentajeMedidaPreventiva: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      cubreMedidaCautelar: [false, Validators.required],
      avaluoTentativo: [0, [Validators.required, Validators.min(0)]],
      comentarioSatje: [''],
      observacionesAdicionales: [''],
      secuencialDocumento: [''],
      secuencialAbogado: [''],
      secuencialGestor: ['']
    });
  }

  private loadData(): void {
    this.unidadJudicialService.getAll().subscribe({
      next: (data) => {
        this.unidadesJudiciales = data;
        this.filteredUnidadesJudiciales = this.unidadJudicialControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterList(value, this.unidadesJudiciales, 'nombre'))
        );
      },
      error: (err) => console.error('Error loading unidades judiciales:', err)
    });

    this.tipoTramiteService.getAll().subscribe({
      next: (data) => {
        this.tiposTramite = data;
        this.filteredTiposTramite = this.tipoTramiteControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterList(value, this.tiposTramite, 'nombre'))
        );
      },
      error: (err) => console.error('Error loading tipos tramite:', err)
    });

    this.tipoMateriaService.getAll().subscribe({
      next: (data) => {
        this.tiposMateria = data;
        this.filteredTiposMateria = this.tipoMateriaControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterList(value, this.tiposMateria, 'nombre'))
        );
      },
      error: (err) => console.error('Error loading tipos materia:', err)
    });

    this.tipoMedidaCautelarService.getAll().subscribe({
      next: (data) => {
        this.tiposMedidaCautelar = data;
        this.filteredTiposMedidaCautelar = this.tipoMedidaCautelarControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterList(value, this.tiposMedidaCautelar, 'nombre'))
        );
      },
      error: (err) => console.error('Error loading tipos medida cautelar:', err)
    });

    this.tipoDocumentoService.getAll().subscribe({
      next: (data) => {
        this.tiposDocumento = data;
        this.filteredTiposDocumento = this.tipoDocumentoControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterList(value, this.tiposDocumento, 'nombre'))
        );
      },
      error: (err) => console.error('Error loading tipos documento:', err)
    });

    // Load abogados and gestores for secuencialOficina = 1 (replace with dynamic value)
    this.abogadoGestorOficinaService.getAbogadosByOficina(1).subscribe({
      next: (data) => {
        this.abogados = data;
        this.filteredAbogados = this.abogadoControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterList(value, this.abogados, 'nombre'))
        );
      },
      error: (err) => console.error('Error loading abogados:', err)
    });

    this.abogadoGestorOficinaService.getGestoresByOficina(1).subscribe({
      next: (data) => {
        this.gestores = data;
        this.filteredGestores = this.gestorControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterList(value, this.gestores, 'nombre'))
        );
      },
      error: (err) => console.error('Error loading gestores:', err)
    });
  }

  private filterList(value: string, list: any[], field: string): any[] {
    const filterValue = value.toLowerCase();
    return list.filter(item => item[field].toLowerCase().includes(filterValue));
  }

  displayFn(item: any): string {
    return item ? item.nombre : '';
  }

  onSubmit(): void {
    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   return;
    // }

    // const request: PrestamoDemandaJudicialRequest = {
    //   secuencialPrestamo: this.form.value.secuencialPrestamo,
    //   fechaComiteMora: this.form.value.fechaComiteMora,
    //   fechaDemanda: this.form.value.fechaDemanda,
    //   fechaEntregaExpediente: this.form.value.fechaEntregaExpediente,
    //   saldoCapitalALaFecha: this.form.value.saldoCapitalALaFecha,
    //   saldoTotalALaFecha: this.form.value.saldoTotalALaFecha,
    //   secuencialUnidadJudicial: this.form.value.secuencialUnidadJudicial,
    //   codigoTramite: this.form.value.codigoTramite,
    //   codigoMateria: this.form.value.codigoMateria,
    //   codigoMedidaCautelar: this.form.value.codigoMedidaCautelar,
    //   porcentajeMedidaPreventiva: this.form.value.porcentajeMedidaPreventiva,
    //   cubreMedidaCautelar: this.form.value.cubreMedidaCautelar ? 1 : 0,
    //   avaluoTentativo: this.form.value.avaluoTentativo,
    //   comentarioSatje: this.form.value.comentarioSatje || undefined,
    //   observacionesAdicionales: this.form.value.observacionesAdicionales || undefined,
    //   secuencialDocumento: this.form.value.secuencialDocumento || undefined,
    //   secuencialAbogado: this.form.value.secuencialAbogado || undefined,
    //   secuencialGestor: this.form.value.secuencialGestor || undefined
    // };

    // this.prestamoDemandaJudicialService.createPrestamoDemandaJudicial(request).subscribe({
    //   next: (response) => {
    //     console.log('Success:', response);
    //     // Handle success
    //   },
    //   error: (err) => {
    //     console.error('Error:', err);
    //     // Handle error
    //   }
    // });
  }
}