import { CommonModule } from '@angular/common';
import {  Component, ViewEncapsulation } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    encapsulation: ViewEncapsulation.None,
    imports: [
        CommonModule,
        RouterOutlet
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {

}
