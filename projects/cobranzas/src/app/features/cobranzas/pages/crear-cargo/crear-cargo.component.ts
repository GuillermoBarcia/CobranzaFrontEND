import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BreadCrumbComponent } from "shared";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crear-cargo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BreadCrumbComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule
],
  templateUrl: './crear-cargo.component.html',
  styleUrls: ['./crear-cargo.component.scss']
})
export class CrearCargoComponent implements OnInit {
  cargoForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit() {
    if (!this.cargoForm) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.cargoForm = this.fb.group({
      nroOperacion: ['01078000'],
      tipoOperacion: ['CONSUMO CASQUETE PAOLA ELIZABETH GUERRERO'],
      deudor: [''],
      rubro: ['GASTOS LEGALES'],
      prioridad: [''],
      tasa: [{ min: 0, max: 0, value: 0 }],
      valor: ['12.50'],
      descripcion: ['CCH-TLC-JAG'],
      cuenta: [''],
      cuota: [''] // Nuevo campo Cuota
    });
  }
}
