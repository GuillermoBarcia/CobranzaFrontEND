import { Component, Inject } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sapcedi } from '../../../../../../../shared/src/lib/models/sapcedi.model';

@Component({
  selector: 'app-aprobar-cita-rechazada-dialog',
  template: ''
})
export class AprobarCobranzaDialogComponent {
  constructor(
    private _fuseConfirmationService: FuseConfirmationService,
    public dialogRef: MatDialogRef<AprobarCobranzaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      cita: Sapcedi;
      titulo?: string;
      mensaje?: string;
      textoConfirmar?: string;
      textoCancelar?: string;
    }
  ) {
    this.mostrarDialogo();
  }

  private mostrarDialogo(): void {
    const confirmation = this._fuseConfirmationService.open({
      title: this.data.titulo || 'Aprobar Cita Rechazada',
      message: this.data.mensaje || '¿Estás seguro de aprobar esta cita rechazada?',
      actions: {
        confirm: {
          label: this.data.textoConfirmar || 'Aceptar',
          color: 'primary'
        },
        cancel: {
          label: this.data.textoCancelar || 'Cancelar'
        }
      },
      dismissible: true,
      icon: {
        show: false
      }
    });

    confirmation.afterClosed().subscribe((result) => {
      this.dialogRef.close(result === 'confirmed');
    });
  }
}
