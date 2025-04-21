import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ],
      exports: [
        // Angular Modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SharedLibraryModule {
 
}