// Paso 2: Crea un servicio para consumir la API en src/app/services/unidad-judicial.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConfig, ApiResponse, AuthService, UnidadJudicial } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class UnidadJudicialService {

    constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig,
    private authService: AuthService // Inyecta AuthService para el token
  ) {}

   // Método para obtener todas las unidades judiciales (GET /UnidadJudicials)
  getAll(): Observable<UnidadJudicial[]> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Usa la URL desde ApiConfig, que es baseUrl + '/UnidadJudicials/'
    // Nota: si la URL tiene trailing slash, el http.get lo maneja.
    return this.http.get<ApiResponse<UnidadJudicial[]>>(this.apiConfig.getUnidadJudicialActivoUrl(), { headers }).pipe(
      map(response => {
        if (response.estadoTransaccion) {
          return response.jsonObject;
        } else {
          throw new Error(response.detalleError || 'Error en la transacción');
        }
      }),
      catchError(error => {
        console.error('Error al obtener unidades judiciales', error);
        return throwError(() => new Error('Error al obtener unidades judiciales: ' + error.message));
      })
    );
  }


 // Método para obtener una unidad judicial por secuencial (ID) (GET /UnidadJudicials/{id})
  getById(secuencial: number): Observable<UnidadJudicial> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Construye la URL: apiConfig.getUnidadJudicialActivoUrl() es '/UnidadJudicials/', así que agrega el ID
    const url = `${this.apiConfig.getUnidadJudicialActivoUrl()}${secuencial}`;
    
    return this.http.get<ApiResponse<UnidadJudicial>>(url, { headers }).pipe(
      map(response => {
        if (response.estadoTransaccion) {
          return response.jsonObject;
        } else {
          throw new Error(response.detalleError || 'Error en la transacción');
        }
      }),
      catchError(error => {
        console.error('Error al obtener unidad judicial por ID', error);
        return throwError(() => new Error('Error al obtener unidad judicial por ID: ' + error.message));
      })
    );
  }
  
}