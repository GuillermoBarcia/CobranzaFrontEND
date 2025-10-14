// lib/services/dialog/dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent, AlertDialogData } from '../../components/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  /**
   * Abre un diálogo de confirmación personalizable
   * @param data Configuración del diálogo
   * @returns Promise que resuelve a true si el usuario confirma, false si cancela
   */
  openConfirmationDialog(data: AlertDialogData): Promise<boolean> {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: data
    });

    return dialogRef.afterClosed().toPromise();
  }

  /**
   * Abre un diálogo para aprobar citas
   * @param item El objeto de cita a aprobar
   * @param options Opciones personalizadas para el diálogo
   * @returns Promise que resuelve a true si el usuario confirma, false si cancela
   */
  openAprobarCitaDialog(item: any, options?: AlertDialogData): Promise<boolean> {
    const data: AlertDialogData = {
      titulo: options?.titulo ?? 'Aprobar Cita',
      mensaje: options?.mensaje ?? '¿Estás seguro de aprobar esta cita?',
      textoConfirmar: options?.textoConfirmar ?? 'Aceptar',
      textoCancelar: options?.textoCancelar ?? 'Cancelar',
      icon: options?.icon ?? { show: false }
    };

    return this.openConfirmationDialog(data);
  }

  /**
   * Abre un diálogo para rechazar citas
   * @param item El objeto de cita a rechazar
   * @param options Opciones personalizadas para el diálogo
   * @returns Promise que resuelve a true si el usuario confirma, false si cancela
   */
  openRechazarCitaDialog(item: any, options?: AlertDialogData): Promise<boolean> {
    const data: AlertDialogData = {
      titulo: options?.titulo ?? 'Rechazar Cita',
      mensaje: options?.mensaje ?? '¿Estás seguro de rechazar esta cita?',
      textoConfirmar: options?.textoConfirmar ?? 'Aceptar',
      textoCancelar: options?.textoCancelar ?? 'Cancelar',
      icon: options?.icon ?? { show: false }
    };

    return this.openConfirmationDialog(data);
  }

  /**
   * Abre un diálogo de éxito
   * @param mensaje El mensaje a mostrar
   * @returns Promise que resuelve a true cuando el usuario cierra el diálogo
   */
  openSuccessDialog(mensaje: string): Promise<boolean> {
    const data: AlertDialogData = {
      titulo: 'Éxito',
      mensaje: mensaje,
      textoConfirmar: 'Aceptar',
      textoCancelar: '',
      icon: {
        show: true,
        name: 'check_circle',
        color: 'success'  // Ahora usando un valor válido de IconColor
      }
    };
    return this.openConfirmationDialog(data);
  }
  /**
   * Abre un diálogo de error
   * @param mensaje El mensaje de error a mostrar
   * @returns Promise que resuelve a true cuando el usuario cierra el diálogo
   */
  openErrorDialog(mensaje: string): Promise<boolean> {
    const data: AlertDialogData = {
      titulo: 'Error',
      mensaje: mensaje,
      textoConfirmar: 'Aceptar',
      textoCancelar: '',
      icon: {
        show: true,
        name: 'error',
        color: 'error'  // Ahora usando un valor válido de IconColor
      }
    };

    return this.openConfirmationDialog(data);
  }
}
