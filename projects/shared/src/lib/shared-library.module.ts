import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';


@NgModule({
    declarations: [
      
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BreadCrumbComponent
      ],
      exports: [
        // Angular Modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BreadCrumbComponent
      ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SharedLibraryModule {
 
}