import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-prestamo-maestro',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './prestamo-maestro.component.html',
  styleUrls: ['./prestamo-maestro.component.scss']
})
export class PrestamoMaestroComponent {
  @Output() documentoUploaded = new EventEmitter<{ type: string; base64: string; description: string }>();

  // Variables para Informe (D001)
  informeFileName = '';
  uploadProgressInforme = 0;
  isUploadingInforme = false;

  // Variables para Acta (D002)
  actaFileName = '';
  uploadProgressActa = 0;
  isUploadingActa = false;

  onInformeSelected(event: Event): void {
    this.handleFileSelected(event, 'D001', 'INFORME', this.informeFileName, this.uploadProgressInforme, this.isUploadingInforme);
  }

  onActaSelected(event: Event): void {
    this.handleFileSelected(event, 'D002', 'ACTA', this.actaFileName, this.uploadProgressActa, this.isUploadingActa);
  }

  private handleFileSelected(event: Event, type: string, description: string, fileNameRef: string, progressRef: number, uploadingRef: boolean): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type !== 'application/pdf') {
        alert('Por favor, seleccione un archivo PDF.');
        return;
      }

      // Actualizamos el nombre del archivo (ahora lo seteamos correctamente)
      fileNameRef = file.name;

      uploadingRef = true;
      progressRef = 0;

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = (e.target?.result as string).split(',')[1]; // Extrae solo la parte base64
        this.documentoUploaded.emit({
          type: type,
          base64: base64,
          description: description
        });
        progressRef = 100;
        uploadingRef = false;
      };
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          progressRef = (e.loaded / e.total) * 100;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}