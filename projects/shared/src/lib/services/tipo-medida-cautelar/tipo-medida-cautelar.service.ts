import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConfig, ApiResponse, TipoMedidaCautelar } from 'shared'; // Asume que ApiConfig está en shared
import { AuthService } from 'shared'; // Asume AuthService en shared

@Injectable({
  providedIn: 'root'
})
export class TipoMedidaCautelarService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig,
    private authService: AuthService // Inyecta AuthService para el token
  ) {}

  // Método para obtener todas las tipos de medida cautelar (GET /TipoMedidaCautelars/)
  getAll(): Observable<TipoMedidaCautelar[]> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Usa la URL desde ApiConfig
    return this.http.get<ApiResponse<TipoMedidaCautelar[]>>(this.apiConfig.getTipoMedidaCautelarsUrl(), { headers }).pipe(
      map(response => {
        if (response.estadoTransaccion) {
          return response.jsonObject;
        } else {
          throw new Error(response.detalleError || 'Error en la transacción');
        }
      }),
      catchError(error => {
        console.error('Error al obtener tipos de medida cautelar', error);
        return throwError(() => new Error('Error al obtener tipos de medida cautelar: ' + error.message));
      })
    );
  }

  // Método para obtener un tipo de medida cautelar por código (GET /TipoMedidaCautelars/{codigo})
  getByCodigo(codigo: string): Observable<TipoMedidaCautelar> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Construye la URL: apiConfig.getTipoMedidaCautelarsUrl() + codigo
    const url = `${this.apiConfig.getTipoMedidaCautelarsUrl()}${codigo}`;
    
    return this.http.get<ApiResponse<TipoMedidaCautelar>>(url, { headers }).pipe(
      map(response => {
        if (response.estadoTransaccion) {
          return response.jsonObject;
        } else {
          throw new Error(response.detalleError || 'Error en la transacción');
        }
      }),
      catchError(error => {
        console.error('Error al obtener tipo de medida cautelar por código', error);
        return throwError(() => new Error('Error al obtener tipo de medida cautelar por código: ' + error.message));
      })
    );
  }
}