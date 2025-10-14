import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // Agregar Router
import { ClientePrestamo, Documento, PrestamoMaestroService, BreadCrumbComponent, 
  PrestamoPorIdentificacionRequest, PrestamoPorIdentificacionResponse, SearchComponent, 
  AuthService,
  DialogBoxComponent,
  CommonDialogsService,
  PrestamoMaestroRequest} from 'shared';
import { PrestamoMaestroComponent } from "../prestamo-maestro/prestamo-maestro.component";
import { MatIcon } from "@angular/material/icon";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-prestamo-maestro-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    RouterModule,
    BreadCrumbComponent,
    PrestamoMaestroComponent,
    SearchComponent,
    MatIcon
],
  templateUrl: './prestamo-maestro-form.component.html',
  styleUrls: ['./prestamo-maestro-form.component.scss']
})
export class PrestamoMaestroFormComponent implements OnInit {
  prestamoForm!: FormGroup;
  searchForm!: FormGroup;
  informeDocumento: Documento | null = null;
  actaDocumento: Documento | null = null;
  codigoUsuario: string | null = null; // Variable para almacenar el usuario autenticado
  oficinaNombre: string | null = null; // Nombre de la oficina para mostrar
  oficinaSecuencial: number | null = null; // Secuencial para el formulario
  mostrarUploader = true;

  constructor(
    private fb: FormBuilder,
    private prestamoMaestroService: PrestamoMaestroService,
    private authService: AuthService, // Inyectar AuthService
    private router: Router, // Inyectar Router para redirección
   private readonly dialog: MatDialog,
    private readonly dialogService: CommonDialogsService,
   
  ) {}

  ngOnInit() {
    this.codigoUsuario = this.authService.getUsuario(); // Obtener usuario autenticado
    if (!this.codigoUsuario) {
      console.error('No hay usuario autenticado');
      this.dialogService.showCustomInfoMessageOrGeneric('No hay usuario autenticado.');
      this.router.navigate(['/login']); // Redirigir al login si no hay usuario
      return;
    }
    this.initializeForms();
  }

  clearField(): void {
    this.searchForm.get('p')?.setValue('');
    this.prestamoForm.reset();
    this.prestamoForm.patchValue({
      codigoUsuario: this.codigoUsuario,
      estaActivo: 1
    });
    this.informeDocumento = null;
    this.actaDocumento = null;
    this.oficinaNombre = null;
    this.oficinaSecuencial = null;
  }

  filterInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^0-9]/g, ''); // Elimina todo excepto números
    this.searchForm.get('p')?.setValue(value, { emitEvent: false }); // Actualiza el valor sin disparar eventos adicionales
  }

  private initializeForms(): void {
    this.prestamoForm = this.fb.group({
      numeroPagare: [{ value: '', disabled: true }, Validators.required],
      identificaClienteExterno: [{ value: '', disabled: true }, Validators.required],
      identificacion: [{ value: '', disabled: true }, Validators.required],
      nombre: [{ value: '', disabled: true }, Validators.required],
      apellido: [{ value: '', disabled: true }, Validators.required],
      montoAprobado: [{ value: 0, disabled: true }],
      montoDesembolsado: [{ value: 0, disabled: true }],
      fechaAdjudicacion: [{ value: null, disabled: true }, Validators.required],
      fechaVencimiento: [{ value: null, disabled: true }, Validators.required],
      secuencialOficina: [1, Validators.required],
      oficinaNombre: [{ value: '', disabled: true }, Validators.required],
      codigoUsuario: [{ value: this.codigoUsuario, disabled: true }, Validators.required],
      estaActivo: [{ value: 1, disabled: true }]
    });

    this.searchForm = this.fb.group({
      p: ['',[Validators.pattern('[0-9]*')]] // Control para el campo "Pagaré"
    });
  }

  onDocumentoUploaded(event: { type: string; base64: string; description: string }): void {
    const documento: Documento = {
      codigoTipoDocumento: event.type,
      documentoDecodificado: event.base64,
      descripcion: event.description,
      codigoUsuario: this.codigoUsuario || 'UNKNOWN', // Usar usuario autenticado
      fechaSistema: new Date().toISOString(),
      estaActivo: 1
    };
    if (event.type === 'D001') {
      this.informeDocumento = documento;
    } else if (event.type === 'D002') {
      this.actaDocumento = documento;
    }
  }

  onSearch(): void {
    const numeroPrestamo = this.searchForm.get('p')?.value;
    if (!numeroPrestamo) {
          this.dialogService.showCustomInfoMessageOrGeneric('Por favor, ingrese el número de pagaré.');
      return;
    }

    const request: PrestamoPorIdentificacionRequest = {
      identificacion: '',
      numeroPrestamo: numeroPrestamo
    };

    console.log('Enviando request:', request);
    this.prestamoMaestroService.getPrestamosPorIdentificacionNumero(request).subscribe({
      next: (response: PrestamoPorIdentificacionResponse) => {
        console.log('Respuesta recibida:', response);
        if (response.estadoTransaccion && response.jsonObject.length > 0) {
          const data = response.jsonObject[0];
          this.oficinaNombre = data.secuencialOficinaNavigation.nombre; // Guardar nombre de la oficina
          this.oficinaSecuencial = data.secuencialOficinaNavigation.secuencial; // Guardar secuencial
          this.prestamoForm.patchValue({
            numeroPagare: data.numeroPagare,
            identificaClienteExterno: data.secuencialClienteNavigation.identificaClienteExterno,
            identificacion: data.secuencialClienteNavigation.identificacion,
            nombre: data.secuencialClienteNavigation.nombre,
            apellido: data.secuencialClienteNavigation.apellido,
            montoAprobado: data.montoAprobado,
            montoDesembolsado: data.montoDesembolsado,
            fechaAdjudicacion: new Date(data.fechaAdjudicacion),
            fechaVencimiento: new Date(data.fechaVencimiento),
            secuencialOficina: data.secuencialOficinaNavigation.secuencial,
            codigoUsuario: this.codigoUsuario, // Mantener usuario autenticado
            estaActivo: 1
          });
          console.log('Formulario llenado:', data);
        } else {
          // alert('No se encontraron datos para el número de pagaré ingresado.');
          this.dialogService.showSimpleNoContent();
          this.prestamoForm.reset();
          this.prestamoForm.patchValue({
            codigoUsuario: this.codigoUsuario,
            estaActivo: 1
          });
            this.oficinaNombre = null;
          this.oficinaSecuencial = null;
        }
      },
      error: (err) => {
        console.error('Error al buscar préstamos', err);
        // alert('Error al buscar préstamos: ' + err.message);

        this.dialogService.showDataLoadingError('Préstamos',  err.message)
      }
    });
  }

  onSubmit(): void {
    if (this.prestamoForm.valid && this.informeDocumento && this.actaDocumento) {
      const request: PrestamoMaestroRequest = {
        numeroPagare: this.prestamoForm.get('numeroPagare')?.value,
        clientePrestamo: {
          identificaClienteExterno: this.prestamoForm.get('identificaClienteExterno')?.value,
          identificacion: this.prestamoForm.get('identificacion')?.value,
          nombre: this.prestamoForm.get('nombre')?.value,
          apellido: this.prestamoForm.get('apellido')?.value,
          estaActivo: 1
        } as ClientePrestamo,
        montoAprobado: this.prestamoForm.get('montoAprobado')?.value,
        montoDesembolsado: this.prestamoForm.get('montoDesembolsado')?.value,
        fechaAdjudicacion: this.prestamoForm.get('fechaAdjudicacion')?.value.toISOString(),
        fechaVencimiento: this.prestamoForm.get('fechaVencimiento')?.value.toISOString(),
        documentoInforme: this.informeDocumento,
        documentoActaInicioAccionLegal: this.actaDocumento,
        secuencialOficina: this.prestamoForm.get('secuencialOficina')?.value,
        codigoUsuario: this.codigoUsuario || 'UNKNOWN', // Usar usuario autenticado
        fechaSistema: new Date().toISOString(),
        estaActivo: this.prestamoForm.get('estaActivo')?.value
      };

      this.prestamoMaestroService.createPrestamoMaestro(request).subscribe({
        next: (response) => {
          console.log('Préstamo creado:', response);
          this.dialogService.showCustomSucessMessageOrGeneric();
          this.prestamoForm.reset();
          this.prestamoForm.patchValue({
            codigoUsuario: this.codigoUsuario,
            estaActivo: 1
          });
          this.informeDocumento = null;
          this.actaDocumento = null;
          this.oficinaNombre = null;
          this.oficinaSecuencial = null;

            // 🔹 Reinicia el componente hijo:
          this.mostrarUploader = false;
          setTimeout(() => (this.mostrarUploader = true), 0);
       
        },
        error: (err) => {
          console.error('Error al crear préstamo', err);
          // alert('Error al guardar el préstamo');
          this.dialogService.showCustomErrorMessageOrGeneric('Error al guardar el préstamo. ' + err.message)

        }
      });
    } else {
        this.dialogService.showCustomInfoMessageOrGeneric('Por favor, complete todos los campos y suba ambos documentos.');
    }
  }

}