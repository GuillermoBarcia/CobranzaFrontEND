import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CoreModule } from './core/core.module';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule
  ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}