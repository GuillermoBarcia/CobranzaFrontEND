/* istanbul ignore file */
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-dialog-box',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './dialog-box.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DialogBoxComponent {
  @Input() title = 'Confirmar';
  @Input() message = '¿Estás seguro de realizar esta acción?';
  @Input() confirmText = 'Aceptar';
  @Input() cancelText = 'Cancelar';
  @Input() icon = 'help';
  @Input() showIcon = true;
  @Input() color: 'primary' | 'accent' | 'warn' | '' = 'primary';
  @Input() showCancelButton = false;

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  constructor(
    public dialogRef?: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    if (data) {
      this.title = data.title ?? this.title;
      this.message = data.message ?? this.message;
      this.confirmText = data.confirmText ?? this.confirmText;
      this.cancelText = data.cancelText ?? this.cancelText;
      this.icon = data.icon ?? this.icon;
      this.showIcon = data.showIcon ?? this.showIcon;
      this.color = data.color ?? this.color;
    }
  }

  getIconColorClass(): string {
    if (this.data?.iconColor) {
      return this.data.iconColor;
    }
    
    switch (this.color) {
      case 'primary': return 'text-secondary';
      case 'accent': return 'text-success';
      case 'warn': return 'text-error';
      default: return 'text-gray-600';
    }
  }

  getTitleColorClass(): string {
    if (this.data?.titleColor) {
      return this.data.titleColor;
    }
    
    switch (this.color) {
      case 'primary': return 'text-secondary';
      case 'accent': return 'text-success';
      case 'warn': return 'text-error';
      default: return 'text-gray-800';
    }
  }

  getConfirmButtonClass(): string {
    if (this.data?.buttonClass) {
      return this.data.buttonClass;
    }
    
    switch (this.color) {
      case 'primary': return 'main-brand-bg-secondary text-white';
      case 'accent': return 'main-brand-bg-positive text-white';
      case 'warn': return 'main-brand-bg-error text-white';
      default: return 'bg-gray-600 text-white';
    }
  }

  getCancelButtonClass(): string {
    if (this.data?.cancelButtonClass) {
      return this.data.cancelButtonClass;
    }
    return 'button-cancel';
  }

  onConfirm(): void {
    this.confirmed.emit();
    if (this.dialogRef) {
      this.dialogRef.close(true);
    }
  }

  onCancel(): void {
    this.cancelled.emit();
    if (this.dialogRef) {
      this.dialogRef.close(false);
    }
  }
}
