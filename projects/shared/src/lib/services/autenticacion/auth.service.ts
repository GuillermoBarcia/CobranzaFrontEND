import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiConfig } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private usuarioSubject = new BehaviorSubject<string | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiConfig: ApiConfig
  ) {
    // Cargar usuario desde localStorage si existe (para persistencia después de recargas)
    const storedUsuario = localStorage.getItem('usuario');
    if (storedUsuario) {
      this.usuarioSubject.next(storedUsuario);
    }
  }

  
login(credentials: { usuario: string; contrasena: string }): Observable<{ token: string }> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ token: string }>(this.apiConfig.getAuthLoginUrl(), credentials, { headers }).pipe(
      tap(response => {
        // Almacenar token (funcionalidad existente)
        localStorage.setItem('token', response.token);
        
        // Almacenar usuario (nuevo: usar credentials.usuario ya que el response no lo incluye)
        const usuario = credentials.usuario;
        localStorage.setItem('usuario', usuario);
        this.usuarioSubject.next(usuario); // Actualizar BehaviorSubject
      }),
      catchError(error => {
        console.error('Login error', error);
        return throwError(() => new Error('Credenciales incorrectas o error en el servidor'));
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  // Nuevo método: Obtener el usuario autenticado actual
  getUsuario(): string | null {
    return this.usuarioSubject.value;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}