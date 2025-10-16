import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfig {
  private readonly baseUrl = 'https://cloud.chibuleo.com/ChibuleoGestionCobranzas/api';
  private readonly baseUrlCloud = 'https://cloud.chibuleo.com/ChibuleoGestionCobranzas/api';


  getAuthLoginUrl(): string {
    return `${this.baseUrl}/Auth/login`;
  }

  createPrestamoMaestroesUrl(): string {
    return `${this.baseUrl}/PrestamoMaestroes`;
  }

  getPrestamosPorIdentificacionNumeroUrl(): string {
    return `${this.baseUrl}/PrestamoMaestroes/PrestamosPorIdentificacionNumero`;
  }

   getPrestamosIngresadosUrl(): string {
    return `${this.baseUrl}/PrestamoMaestroes/PrestamosIngresados`;
  }

  getUnidadJudicialActivoUrl(): string {
    return `${this.baseUrl}/UnidadJudicials/`;
  }

  getTipoTramitesUrl(): string {
    return `${this.baseUrl}/TipoTramites/`;
  }

   getTipoMedidaCautelarsUrl(): string {
    return `${this.baseUrl}/TipoMedidaCautelars/`;
  }

    getTipoMateriasUrl(): string {
    return `${this.baseUrl}/TipoMaterias/`;
  }

  getTipoDocumentoesUrl(): string {
    return `${this.baseUrl}/TipoDocumentoes/`;
  }

  getAbogadoOficinaActivoItemUrl(secuencialOficina: number): string {
    return `${this.baseUrl}/AbogadoGestorOficinas/AbogadoOficinaActivoItem?secuencialOficina=${secuencialOficina}`;
  }

  getGestorOficinaActivoItemUrl(secuencialOficina: number): string {
    return `${this.baseUrl}/AbogadoGestorOficinas/GestorOficinaActivoItem?secuencialOficina=${secuencialOficina}`;
  }
}