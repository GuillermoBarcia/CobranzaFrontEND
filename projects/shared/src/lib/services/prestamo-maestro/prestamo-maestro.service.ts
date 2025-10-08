import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ApiConfig, PrestamoMaestroRequest, PrestamoMaestroResponse, PrestamoPorIdentificacionRequest, PrestamoPorIdentificacionResponse } from "shared";
import { AuthService } from "../../../../../shell/src/app/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class PrestamoMaestroService {
  constructor(
    private http: HttpClient, 
    private apiConfig: ApiConfig,
    private authService: AuthService // Inyecta AuthService
    ) {}


    getPrestamosPorIdentificacionNumero(request: PrestamoPorIdentificacionRequest): Observable<PrestamoPorIdentificacionResponse> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token available. Please log in.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<PrestamoPorIdentificacionResponse>(this.apiConfig.getPrestamosPorIdentificacionNumeroUrl(), request, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener préstamos', error);
        return throwError(() => new Error('Error al obtener préstamos: ' + error.message));
      })
    );
  }

createPrestamoMaestro(prestamoData: PrestamoMaestroRequest): Observable<PrestamoMaestroResponse> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Token no valida, logearse.');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Añade el token como Bearer
    });

    return this.http.post<PrestamoMaestroResponse>(this.apiConfig.getPrestamoMaestroesUrl(), prestamoData, { headers }).pipe(
      catchError(error => {
        console.error('Error al crear PrestamoMaestro', error);
        return throwError(() => new Error('Error al crear el préstamo: ' + error.message));
      })
    );
  }
}