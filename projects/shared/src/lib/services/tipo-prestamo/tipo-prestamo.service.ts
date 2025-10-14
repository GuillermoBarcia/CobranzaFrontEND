import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConfig, ApiResponse, TipoTramite } from 'shared'; // Asume que ApiConfig está en shared
import { AuthService } from 'shared'; // Asume AuthService en shared

@Injectable({
  providedIn: 'root'
})
export class TipoTramiteService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig,
    private authService: AuthService // Inyecta AuthService para el token
  ) {}

  // Método para obtener todos los tipos de trámite (GET /TipoTramites/)
  getAll(): Observable<TipoTramite[]> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Usa la URL desde ApiConfig
    return this.http.get<ApiResponse<TipoTramite[]>>(this.apiConfig.getTipoTramitesUrl(), { headers }).pipe(
      map(response => {
        if (response.estadoTransaccion) {
          return response.jsonObject;
        } else {
          throw new Error(response.detalleError || 'Error en la transacción');
        }
      }),
      catchError(error => {
        console.error('Error al obtener tipos de trámite', error);
        return throwError(() => new Error('Error al obtener tipos de trámite: ' + error.message));
      })
    );
  }

  // Método para obtener un tipo de trámite por código (GET /TipoTramites/{codigo})
  getByCodigo(codigo: string): Observable<TipoTramite> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Construye la URL: apiConfig.getTipoTramitesUrl() + codigo
    const url = `${this.apiConfig.getTipoTramitesUrl()}${codigo}`;
    
    return this.http.get<ApiResponse<TipoTramite>>(url, { headers }).pipe(
      map(response => {
        if (response.estadoTransaccion) {
          return response.jsonObject;
        } else {
          throw new Error(response.detalleError || 'Error en la transacción');
        }
      }),
      catchError(error => {
        console.error('Error al obtener tipo de trámite por código', error);
        return throwError(() => new Error('Error al obtener tipo de trámite por código: ' + error.message));
      })
    );
  }
}
