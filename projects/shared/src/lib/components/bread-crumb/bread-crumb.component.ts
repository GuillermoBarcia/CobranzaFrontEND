import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'lib-bread-crumb',
  imports: [
    CommonModule,
    RouterModule 
  ],  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.css'
})
export class BreadCrumbComponent {
  @Input() items: { label: string; url?: string }[] = [];
  @Input() titulo?:string | null;
}
