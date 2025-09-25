/* istanbul ignore file */
import { Component, ViewEncapsulation, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerComponent } from '@fuse/components/drawer';

/**º
 * Componente Search
 * 
 * Componente reutilizable para búsqueda, con integración de drawer lateral para configuración u opciones adicionales.
 * 
 * @example
 * <lib-search (search)="onBuscar()"></lib-search>
 */
@Component({
  selector: 'lib-search',
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatIconModule,
    FuseDrawerComponent,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  /**
   * Evento emitido cuando se realiza la acción de búsqueda.
   */
  @Output() search = new EventEmitter<void>();

  /**
   * Referencia al drawer de configuración (opcional).
   */
  @ViewChild('settingsDrawer') settingsDrawer?: FuseDrawerComponent;

  /**
   * Ejecuta la búsqueda y cierra el drawer si está abierto.
   */
  onSearch(): void {
    this.search.emit();
    if (this.settingsDrawer) {
      this.settingsDrawer.close();
    }
  }
}
