import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes reutilizables
// import { CardComponent } from './components/card/card.component';
// import { LoaderComponent } from './components/loader/loader.component';

// // Pipes reutilizables
// import { TruncatePipe } from './pipes/truncate.pipe';
// import { DateFormatPipe } from './pipes/date-format.pipe';

// // Directivas reutilizables
// import { AutoFocusDirective } from './directives/auto-focus.directive';

@NgModule({
  declarations: [
    // // Reutilizables
    // CardComponent,
    // LoaderComponent,
    // TruncatePipe,
    // DateFormatPipe,
    // AutoFocusDirective
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

    // // Reutilizables
    // CardComponent,
    // LoaderComponent,
    // TruncatePipe,
    // DateFormatPipe,
    // AutoFocusDirective
  ]
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class SharedModule {}