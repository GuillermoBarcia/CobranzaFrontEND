import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfig {
  private readonly baseUrl = 'https://cloud.chibuleo.com/ChibuleoGestionCobranzas/api';

  getAuthLoginUrl(): string {
    return `${this.baseUrl}/Auth/login`;
  }

  getPrestamoMaestroesUrl(): string {
    return `${this.baseUrl}/PrestamoMaestroes`;
  }

  getPrestamosPorIdentificacionNumeroUrl(): string {
    return `${this.baseUrl}/PrestamoMaestroes/PrestamosPorIdentificacionNumero`;
  }

}