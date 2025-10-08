import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // Agregar Router
import { ClientePrestamo, Documento, PrestamoMaestroRequest, PrestamoMaestroService, BreadCrumbComponent, PrestamoPorIdentificacionRequest, PrestamoPorIdentificacionResponse } from 'shared';
import { PrestamoMaestroComponent } from "../prestamo-maestro/prestamo-maestro.component";
import { SearchComponent } from "../../../../shared/components/search/search.component";
import { AuthService } from '../../../../../../../shell/src/app/services/auth.service';

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
    SearchComponent
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

  constructor(
    private fb: FormBuilder,
    private prestamoMaestroService: PrestamoMaestroService,
    private authService: AuthService, // Inyectar AuthService
    private router: Router // Inyectar Router para redirección
  ) {}

  ngOnInit() {
    this.codigoUsuario = this.authService.getUsuario(); // Obtener usuario autenticado
    if (!this.codigoUsuario) {
      console.error('No hay usuario autenticado');
      this.router.navigate(['/login']); // Redirigir al login si no hay usuario
      return;
    }
    this.initializeForms();
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
      secuencialOficina: [{ value: this.oficinaSecuencial || null, disabled: true }, Validators.required],
      codigoUsuario: [{ value: this.codigoUsuario, disabled: true }, Validators.required],
      estaActivo: [{ value: 1, disabled: true }]
    });

    this.searchForm = this.fb.group({
      p: [''] // Control para el campo "Pagaré"
    });
  }


  // private initializeForms(): void {
  //   this.prestamoForm = this.fb.group({
  //     numeroPagare: ['', Validators.required],
  //     identificaClienteExterno: ['', Validators.required],
  //     identificacion: ['', Validators.required],
  //     nombre: ['', Validators.required],
  //     apellido: ['', Validators.required],
  //     montoAprobado: [0],
  //     montoDesembolsado: [0],
  //     fechaAdjudicacion: [null, Validators.required],
  //     fechaVencimiento: [null, Validators.required],
  //     secuencialOficina: [1, Validators.required],
  //     codigoUsuario: [{ value: this.codigoUsuario, disabled: true }, Validators.required], // Campo readonly con usuario autenticado
  //     estaActivo: [1]
  //   });

  //   this.searchForm = this.fb.group({
  //     p: [''] // Control para el campo "Pagaré"
  //   });
  // }

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
      alert('Por favor, ingrese el número de pagaré.');
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
          alert('No se encontraron datos para el número de pagaré ingresado.');
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
        alert('Error al buscar préstamos: ' + err.message);
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
          alert('Préstamo guardado exitosamente');
          this.prestamoForm.reset();
          this.prestamoForm.patchValue({
            codigoUsuario: this.codigoUsuario,
            estaActivo: 1
          });
          this.informeDocumento = null;
          this.actaDocumento = null;
             this.oficinaNombre = null;
          this.oficinaSecuencial = null;
        },
        error: (err) => {
          console.error('Error al crear préstamo', err);
          alert('Error al guardar el préstamo');
        }
      });
    } else {
      alert('Por favor, complete todos los campos y suba ambos documentos.');
    }
  }
}