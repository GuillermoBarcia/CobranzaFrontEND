import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { SearchComponent } from './components/search/search.component';
import { FuseDrawerComponent } from '@fuse/components/drawer';


@NgModule({
    declarations: [

      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BreadCrumbComponent,
    //     SearchComponent,
    // FuseDrawerComponent

      ],
      exports: [
        // Angular Modules
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BreadCrumbComponent,
    //     SearchComponent,
    // FuseDrawerComponent
      ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SharedLibraryModule {

}
