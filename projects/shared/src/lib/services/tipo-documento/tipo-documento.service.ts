import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConfig, ApiResponse, TipoDocumento } from 'shared'; // Asume que ApiConfig está en shared
import { AuthService } from 'shared'; // Asume AuthService en shared

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig,
    private authService: AuthService // Inyecta AuthService para el token
  ) {}

  // Método para obtener todos los tipos de documento (GET /TipoDocumentoes/)
  getAll(): Observable<TipoDocumento[]> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Usa la URL desde ApiConfig
    return this.http.get<ApiResponse<TipoDocumento[]>>(this.apiConfig.getTipoDocumentoesUrl(), { headers }).pipe(
      map(response => {
        if (response.estadoTransaccion) {
          return response.jsonObject;
        } else {
          throw new Error(response.detalleError || 'Error en la transacción');
        }
      }),
      catchError(error => {
        console.error('Error al obtener tipos de documento', error);
        return throwError(() => new Error('Error al obtener tipos de documento: ' + error.message));
      })
    );
  }

  // Método para obtener un tipo de documento por código (GET /TipoDocumentoes/{codigo})
  getByCodigo(codigo: string): Observable<TipoDocumento> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Construye la URL: apiConfig.getTipoDocumentoesUrl() + codigo
    const url = `${this.apiConfig.getTipoDocumentoesUrl()}${codigo}`;
    
    return this.http.get<ApiResponse<TipoDocumento>>(url, { headers }).pipe(
      map(response => {
        if (response.estadoTransaccion) {
          return response.jsonObject;
        } else {
          throw new Error(response.detalleError || 'Error en la transacción');
        }
      }),
      catchError(error => {
        console.error('Error al obtener tipo de documento por código', error);
        return throwError(() => new Error('Error al obtener tipo de documento por código: ' + error.message));
      })
    );
  }
}