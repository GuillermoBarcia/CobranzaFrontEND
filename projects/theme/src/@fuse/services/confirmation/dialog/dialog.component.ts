import { NgClass } from '@angular/common';
import { Component, ViewEncapsulation, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';

@Component({
    selector: 'fuse-confirmation-dialog',
    templateUrl: './dialog.component.html',
    styles: [
        `
            .fuse-confirmation-dialog-panel {
                @apply md:w-128;
                .mat-mdc-dialog-container {
                    .mat-mdc-dialog-surface {
                        padding: 0 !important;
                    }
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [MatButtonModule, MatDialogModule, MatIconModule, NgClass, ReactiveFormsModule],
    standalone: true
})
export class FuseConfirmationDialogComponent implements OnInit {
    data: FuseConfirmationConfig = inject(MAT_DIALOG_DATA);
    private _dialogRef = inject(MatDialogRef<FuseConfirmationDialogComponent>);
    private _formBuilder = inject(FormBuilder);

    formGroup: FormGroup = this._formBuilder.group({}); // Inicializar aquí
    formFields: {key: string, type: string, config: any}[] = [];

    ngOnInit(): void {
        // Create the form
        this.formGroup = this._formBuilder.group({});

        // Add form controls
        if (this.data.form) {
            for (const [key, config] of Object.entries(this.data.form)) {
                // Add the control to the form
                const validators = config.validators || [];
                this.formGroup.addControl(key, this._formBuilder.control(config.value || '', validators));

                // Add to fields array for template
                this.formFields.push({
                    key,
                    type: config.type,
                    config
                });
            }
        }
    }

    getFormValues(): any {
        if (!this.data.form) {
            return 'confirmed';
        }

        const result: Record<string, any> = {}; // Definir tipo correcto para result

        for (const key of Object.keys(this.data.form)) {
            const control = this.formGroup.get(key);
            if (control) {
                result[key] = control.value;
            }
        }
        return result;
    }
}
