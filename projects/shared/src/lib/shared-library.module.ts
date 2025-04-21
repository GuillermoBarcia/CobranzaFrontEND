import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';


@NgModule({
    declarations: [
      
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BreadCrumbComponent,
        LoginPageComponent
      ],
      exports: [
        // Angular Modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BreadCrumbComponent,
        LoginPageComponent
      ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SharedLibraryModule {
 
}