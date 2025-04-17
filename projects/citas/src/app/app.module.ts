import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}