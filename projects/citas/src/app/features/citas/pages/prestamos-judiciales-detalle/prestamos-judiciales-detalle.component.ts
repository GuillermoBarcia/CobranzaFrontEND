import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from "shared";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatOption } from "@angular/material/core";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-prestamos-judiciales-detalle',
  imports: [ReactiveFormsModule,
    BreadCrumbComponent,
    MatFormField, MatLabel,
     MatOption,
       MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule
    ],
  templateUrl: './prestamos-judiciales-detalle.component.html',
  styleUrl: './prestamos-judiciales-detalle.component.scss'
})
export class PrestamosJudicialesDetalleComponent implements OnInit {
  prestamosJudicialesForm!: FormGroup; // Use definite assignment assertion

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit() {
    // Ensure form is initialized before the view loads
    if (!this.prestamosJudicialesForm) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.prestamosJudicialesForm = this.fb.group({
      pagare: [''],
      abogado: [''],
      fechaEntregaExpediente: [null],
      nullFechaEntregaExpediente: [false],
      valorCuantia: [''],
      tramite: [''],
      medPrevent: [''],
      cubremeCautelar: [''],
      canton: [''],
      causa: [''],
      fechaUltDilig: [null],
      depositoGestion: [''],
      sugerAbogado: [false],
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
      nullObsGenerales: [false]
    });
  }
}
