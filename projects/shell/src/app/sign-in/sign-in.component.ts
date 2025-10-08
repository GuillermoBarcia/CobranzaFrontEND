import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  usuario: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}


onLogin(): void {
    if (!this.usuario || !this.contrasena) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    this.authService.login({ usuario: this.usuario, contrasena: this.contrasena }).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/cobranzas/prestamos-judiciales']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciales incorrectas o error en el servidor. Intenta de nuevo.';
        console.error('Login error', err);
      }
    });
  }
  }