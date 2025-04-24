import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sapcedi } from '../../../../../../shared/src/lib/models/sapcedi.model';
import { AprobarCitaRechazadaDialogComponent } from '../components/aprobar-cita-rechazada-dialog/aprobar-cita-rechazada-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CitasDialogService {
  constructor(private dialog: MatDialog) {}

  openAprobarCitaDialog(cita: Sapcedi, config?: {
    titulo?: string;
    mensaje?: string;
    textoConfirmar?: string;
    textoCancelar?: string;
  }): Promise<boolean> {
    return this.dialog
      .open(AprobarCitaRechazadaDialogComponent, {
        data: { cita, ...config },
        width: '400px',
        disableClose: true
      })
      .afterClosed()
      .toPromise();
  }
}
