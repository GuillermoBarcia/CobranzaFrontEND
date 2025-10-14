/* istanbul ignore file */
import { Component, ViewEncapsulation, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-search',
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatIconModule,
    FuseDrawerComponent,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule // Añadido para manejar el formulario
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  /**
   * Evento emitido cuando se realiza la acción de búsqueda.
   */
  @Output() search = new EventEmitter<string>(); // Cambiado a string para pasar el valor

  /**
   * Referencia al drawer de configuración (opcional).
   */
  @ViewChild('settingsDrawer') settingsDrawer?: FuseDrawerComponent;

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      p: [''] // Control para el campo "Pagaré"
    });
  }

  /**
   * Ejecuta la búsqueda y cierra el drawer si está abierto.
   */
  onSearch(): void {
    const pagareValue = this.searchForm.get('p')?.value;
    if (pagareValue) {
      this.search.emit(pagareValue); // Emite el valor del campo "Pagaré"
    } else {
      this.search.emit(''); // Emite vacío si no hay valor
    }
    if (this.settingsDrawer) {
      this.settingsDrawer.close();
    }
  }
}