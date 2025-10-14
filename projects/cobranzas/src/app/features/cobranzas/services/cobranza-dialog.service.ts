import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AprobarCobranzaDialogComponent } from '../components/aprobar-cita-rechazada-dialog/aprobar-cobranza-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CobranzaDialogService {
  constructor(private dialog: MatDialog) {}

  openAprobarCitaDialog( config?: {
    titulo?: string;
    mensaje?: string;
    textoConfirmar?: string;
    textoCancelar?: string;
  }): Promise<boolean> {
    return this.dialog
      .open(AprobarCobranzaDialogComponent, {
        data: { ...config },
        width: '400px',
        disableClose: true
      })
      .afterClosed()
      .toPromise();
  }
}
