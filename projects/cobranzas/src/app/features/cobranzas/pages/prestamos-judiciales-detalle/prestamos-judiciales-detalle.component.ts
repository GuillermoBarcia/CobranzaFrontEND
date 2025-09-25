import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BreadCrumbComponent } from "shared";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prestamos-judiciales-detalle',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterModule
],
  templateUrl: './prestamos-judiciales-detalle.component.html',
  styleUrl: './prestamos-judiciales-detalle.component.scss'
})
export class PrestamosJudicialesDetalleComponent implements OnInit {
  prestamosJudicialesForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit() {
    if (!this.prestamosJudicialesForm) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.prestamosJudicialesForm = this.fb.group({
      pagare: ['62723'],
      abogado: ['BOCANGEL BALTazar VICTOR DANIEL'],
      fechaEntregaExpediente: [null],
      nullFechaEntregaExpediente: [false],
      valorCuantia: [''],
      tramite: ['CREDIMIGO TRANSPORTISTA'],
      medPrevent: [''],
      cubremeCautelar: [''],
      canton: [''],
      causa: [''],
      fechaUltDilig: [null],
      depositoGestion: [''],
      sugerAbogado: [''],
      deudor: [''],
      fechaCompromisoMora: [null],
      nullFechaCompromisoMora: [false],
      fechaDemanda: [null],
      nullFechaDemanda: [false],
      materia: [''],
      medidaCautelar: [''],
      avaluoTentativo: [''],
      provincia: [''],
      unidadJudicial: [''],
      accionRealizada: [''],
      comentaSatje: [''],
      obsGenerales: [''],
      detproxgestion: [''],
      nullObsGenerales: [false],
      numeroPrestamo: ['62723'], // Nuevo campo
      oficina: ['MAYORISTA'], // Nuevo campo
      tipo: ['CREDIMIGO TRANSPORTISTA'], // Nuevo campo
      salidaUltimoPago: ['14/08/2024'], // Nuevo campo
      proximoVencimiento: ['08/08/2024'], // Nuevo campo
      saldoPrestamo: ['51010.48'], // Nuevo campo
      saldoActual: ['51010.48'] // Nuevo campo
    });
  }
}
