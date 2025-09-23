/* istanbul ignore file */
import { Component, ViewEncapsulation, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseDrawerComponent } from '@fuse/components/drawer';

/**
 * Componente Search
 * 
 * Componente reutilizable para búsqueda, con integración de drawer lateral para configuración u opciones adicionales.
 * 
 * @example
 * <lib-search (search)="onBuscar()"></lib-search>
 */
@Component({
  selector: 'lib-search',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FuseDrawerComponent // Usa el módulo, no el componente
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() search = new EventEmitter<void>();
  @ViewChild('settingsDrawer') settingsDrawer?: FuseDrawerComponent; // Mantén esto para la referencia

  onSearch(): void {
    this.search.emit();
    if (this.settingsDrawer) {
      this.settingsDrawer.close();
    }
  }
}