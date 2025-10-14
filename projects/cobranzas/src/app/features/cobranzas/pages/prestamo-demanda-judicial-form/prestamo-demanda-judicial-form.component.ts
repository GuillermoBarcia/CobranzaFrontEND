// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatButtonModule } from '@angular/material/button';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { TipoMateria, TipoTramite, UnidadJudicial } from 'shared';

// @Component({
//   selector: 'app-prestamo-demanda-judicial-form',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatDatepickerModule,
//     MatCheckboxModule,
//     MatButtonModule
//   ],
//   templateUrl: './prestamo-demanda-judicial-form.component.html',
//   styleUrls: ['./prestamo-demanda-judicial-form.component.scss']
// })
// export class PrestamoDemandaJudicialFormComponent implements OnInit {
//   form!: FormGroup;
//   unidadesJudiciales: UnidadJudicial[] = [];
//   tiposTramite: TipoTramite[] = [];
//   tiposMateria: TipoMateria[] = [];
//   tiposMedidaCautelar: TipoMedidaCautelar[] = [];
//   tiposDocumento: TipoDocumento[] = [];
//   // Placeholder for AbogadoGestor
//   abogados: any[] = []; // Assume service will provide
//   gestores: any[] = []; // Assume service will provide

//   constructor(
//     private fb: FormBuilder,
//     private unidadJudicialService: UnidadJudicialService,
//     private tipoTramiteService: TipoTramiteService,
//     private tipoMateriaService: TipoMateriaService,
//     private tipoMedidaCautelarService: TipoMedidaCautelarService,
//     private tipoDocumentoService: TipoDocumentoService,
//     private prestamoDemandaJudicialService: PrestamoDemandaJudicialService
//   ) {}

//   ngOnInit(): void {
//     this.initializeForm();
//     this.loadData();
//   }

//   private initializeForm(): void {
//     this.form = this.fb.group({
//       secuencialPrestamo: ['', Validators.required],
//       fechaComiteMora: ['', Validators.required],
//       fechaDemanda: ['', Validators.required],
//       fechaEntregaExpediente: ['', Validators.required],
//       saldoCapitalALaFecha: [0, Validators.required],
//       saldoTotalALaFecha: [0, Validators.required],
//       secuencialUnidadJudicial: ['', Validators.required],
//       codigoTramite: ['', Validators.required],
//       codigoMateria: ['', Validators.required],
//       codigoMedidaCautelar: ['', Validators.required],
//       porcentajeMedidaPreventiva: [0, Validators.required],
//       cubreMedidaCautelar: [false, Validators.required],
//       avaluoTentativo: [0, Validators.required],
//       comentarioSatje: [''],
//       observacionesAdicionales: [''],
//       secuencialDocumento: [''],
//       secuencialAbogado: [''],
//       secuencialGestor: ['']
//     });
//   }

//   private loadData(): void {
//     this.unidadJudicialService.getAll().subscribe(data => this.unidadesJudiciales = data);
//     this.tipoTramiteService.getAll().subscribe(data => this.tiposTramite = data);
//     this.tipoMateriaService.getAll().subscribe(data => this.tiposMateria = data);
//     this.tipoMedidaCautelarService.getAll().subscribe(data => this.tiposMedidaCautelar = data);
//     this.tipoDocumentoService.getAll().subscribe(data => this.tiposDocumento = data);
//     // Load abogados and gestores when services are ready
//     // this.abogadoGestorService.getAllAbogados().subscribe(data => this.abogados = data);
//     // this.abogadoGestorService.getAllGestores().subscribe(data => this.gestores = data);
//   }

//   onSubmit(): void {
//     if (this.form.invalid) {
//       return;
//     }

//     const request: PrestamoDemandaJudicialRequest = {
//       secuencialPrestamo: this.form.value.secuencialPrestamo,
//       fechaComiteMora: this.form.value.fechaComiteMora,
//       fechaDemanda: this.form.value.fechaDemanda,
//       fechaEntregaExpediente: this.form.value.fechaEntregaExpediente,
//       saldoCapitalALaFecha: this.form.value.saldoCapitalALaFecha,
//       saldoTotalALaFecha: this.form.value.saldoTotalALaFecha,
//       secuencialUnidadJudicial: this.form.value.secuencialUnidadJudicial,
//       codigoTramite: this.form.value.codigoTramite,
//       codigoMateria: this.form.value.codigoMateria,
//       codigoMedidaCautelar: this.form.value.codigoMedidaCautelar,
//       porcentajeMedidaPreventiva: this.form.value.porcentajeMedidaPreventiva,
//       cubreMedidaCautelar: this.form.value.cubreMedidaCautelar ? 1 : 0,
//       avaluoTentativo: this.form.value.avaluoTentativo,
//       comentarioSatje: this.form.value.comentarioSatje,
//       observacionesAdicionales: this.form.value.observacionesAdicionales,
//       secuencialDocumento: this.form.value.secuencialDocumento,
//       secuencialAbogado: this.form.value.secuencialAbogado,
//       secuencialGestor: this.form.value.secuencialGestor
//     };

//     this.prestamoDemandaJudicialService.createPrestamoDemandaJudicial(request).subscribe({
//       next: (response) => {
//         console.log('Success:', response);
//         // Handle success, e.g., show dialog, navigate
//       },
//       error: (err) => {
//         console.error('Error:', err);
//         // Handle error, e.g., show dialog
//       }
//     });
//   }
// }