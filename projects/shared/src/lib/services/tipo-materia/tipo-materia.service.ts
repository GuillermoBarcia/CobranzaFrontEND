import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConfig, ApiResponse, TipoMateria } from 'shared'; // Asume que ApiConfig está en shared
import { AuthService } from 'shared'; // Asume AuthService en shared

@Injectable({
  providedIn: 'root'
})
export class TipoMateriaService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig,
    private authService: AuthService // Inyecta AuthService para el token
  ) {}

  // Método para obtener todos los tipos de materia (GET /TipoMaterias/)
  getAll(): Observable<TipoMateria[]> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Usa la URL desde ApiConfig
    return this.http.get<ApiResponse<TipoMateria[]>>(this.apiConfig.getTipoMateriasUrl(), { headers }).pipe(
      map(response => {
        if (response.estadoTransaccion) {
          return response.jsonObject;
        } else {
          throw new Error(response.detalleError || 'Error en la transacción');
        }
      }),
      catchError(error => {
        console.error('Error al obtener tipos de materia', error);
        return throwError(() => new Error('Error al obtener tipos de materia: ' + error.message));
      })
    );
  }

  // Método para obtener un tipo de materia por código (GET /TipoMaterias/{codigo})
  getByCodigo(codigo: string): Observable<TipoMateria> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Construye la URL: apiConfig.getTipoMateriasUrl() + codigo
    const url = `${this.apiConfig.getTipoMateriasUrl()}${codigo}`;
    
    return this.http.get<ApiResponse<TipoMateria>>(url, { headers }).pipe(
      map(response => {
        if (response.estadoTransaccion) {
          return response.jsonObject;
        } else {
          throw new Error(response.detalleError || 'Error en la transacción');
        }
      }),
      catchError(error => {
        console.error('Error al obtener tipo de materia por código', error);
        return throwError(() => new Error('Error al obtener tipo de materia por código: ' + error.message));
      })
    );
  }
}