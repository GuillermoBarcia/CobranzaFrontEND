import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {  AbogadoGestor, ApiConfig, ApiResponse, AuthService } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class AbogadoGestorOficinaService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig,
    private authService: AuthService
  ) {}

  getAbogadosByOficina(secuencialOficina: number): Observable<AbogadoGestor[]> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ApiResponse<AbogadoGestor[]>>(this.apiConfig.getAbogadoOficinaActivoItemUrl(secuencialOficina), { headers }).pipe(
      map(response => {
        if (response.estadoTransaccion) {
          return response.jsonObject;
        } else {
          throw new Error(response.detalleError || 'Error en la transacción');
        }
      }),
      catchError(error => {
        console.error('Error al obtener abogados por oficina', error);
        return throwError(() => new Error('Error al obtener abogados por oficina: ' + error.message));
      })
    );
  }

  getGestoresByOficina(secuencialOficina: number): Observable<AbogadoGestor[]> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<ApiResponse<AbogadoGestor[]>>(this.apiConfig.getGestorOficinaActivoItemUrl(secuencialOficina), { headers }).pipe(
      map(response => {
        if (response.estadoTransaccion) {
          return response.jsonObject;
        } else {
          throw new Error(response.detalleError || 'Error en la transacción');
        }
      }),
      catchError(error => {
        console.error('Error al obtener gestores por oficina', error);
        return throwError(() => new Error('Error al obtener gestores por oficina: ' + error.message));
      })
    );
  }
}