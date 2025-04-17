import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { citasRoute } from './citas.routes';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(citasRoute),
    SharedModule
  ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CitasModule {}