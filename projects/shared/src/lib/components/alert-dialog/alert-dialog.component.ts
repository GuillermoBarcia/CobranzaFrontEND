// lib/components/alert-dialog/alert-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

// Definir el tipo para los colores permitidos
type IconColor = "primary" | "accent" | "warn" | "basic" | "info" | "success" | "warning" | "error";

export interface AlertDialogData {
  titulo?: string;
  mensaje?: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  icon?: {
    show: boolean;
    name?: string;
    color?: IconColor;
  };
  dismissible?: boolean; // Agregar esta propiedad como opcional
}

@Component({
  selector: 'lib-alert-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: '',
})
export class AlertDialogComponent {
  constructor(
    // private _fuseConfirmationService: FuseConfirmationService,
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {
  }

}
