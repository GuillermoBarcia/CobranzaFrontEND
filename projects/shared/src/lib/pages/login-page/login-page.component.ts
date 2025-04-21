import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-login-page',

  imports: [
    CommonModule,
    RouterModule 
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class LoginPageComponent {

}
