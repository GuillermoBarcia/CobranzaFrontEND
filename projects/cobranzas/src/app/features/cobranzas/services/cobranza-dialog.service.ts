import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sapcedi } from '../../../../../../shared/src/lib/models/sapcedi.model';
import { AprobarCobranzaDialogComponent } from '../components/aprobar-cita-rechazada-dialog/aprobar-cobranza-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CobranzaDialogService {
  constructor(private dialog: MatDialog) {}

  openAprobarCitaDialog(cita: Sapcedi, config?: {
    titulo?: string;
    mensaje?: string;
    textoConfirmar?: string;
    textoCancelar?: string;
  }): Promise<boolean> {
    return this.dialog
      .open(AprobarCobranzaDialogComponent, {
        data: { cita, ...config },
        width: '400px',
        disableClose: true
      })
      .afterClosed()
      .toPromise();
  }
}
