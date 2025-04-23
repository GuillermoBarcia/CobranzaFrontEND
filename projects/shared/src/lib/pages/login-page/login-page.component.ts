import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [CommonModule, FormsModule] // <-- AGREGA ESTO
})
export class LoginPageComponent {
  loginData = {
    sociedad: '',
    usuario: '',
    contrasena: ''
  };

  sociedades: string[] = ['Corporación El Rosado', 'Mi Comisariato', 'Ferrisariato', 'Mi Juguetería'];

  onSubmit(): void {
    console.log('Datos del login:', this.loginData);
  }
}
