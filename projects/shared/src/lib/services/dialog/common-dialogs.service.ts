import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
    AlertDialogComponent,
    AlertDialogData,
} from '../../components/alert-dialog/alert-dialog.component';
import { DialogBoxComponent } from '../../components/dialog-box/dialog-box.component';

export interface ErrorDialogConfig {
    title?: string;
    message?: string;
    confirmText?: string;
    width?: string;
}

@Injectable({
    providedIn: 'root',
})
export class CommonDialogsService {
    constructor(private dialog: MatDialog) {}
    /**
     * Shows a generic error dialog with customizable content
     */
    showErrorDialog(config: ErrorDialogConfig = {}) {
        return this.dialog.open(DialogBoxComponent, {
            width: config.width || '400px',
            data: {
                title: config.title || 'Mensaje de Error',
                message: config.message || 'Ha ocurrido un error inesperado',
                confirmText: config.confirmText || 'Aceptar',
                color: 'warn',
                showCancelButton: false,
            },
        });
    }
    /**
     * Abre un diálogo de confirmación con un mensaje personalizado.
     * @param message El mensaje a mostrar en el diálogo o default
     * Se debe proporcionar al ingresar datos
     */
    showCustomSucessMessageOrGeneric(message: string | null = null) {
        return this.dialog.open(DialogBoxComponent, {
            width: '400px',
            data: {
                title: 'Mensaje de Éxito',
                message: message || 'Registro Ingresado con éxito.',
                confirmText: 'Aceptar',
                color: 'accent',
                showCancelButton: false,
            },
        });
    }

    showCustomErrorMessageOrGeneric(message: string) {
        return this.dialog.open(DialogBoxComponent, {
            width: '400px',
            data: {
                title: 'Mensaje de Error',
                message: message || 'No se pudo realizar la acción.',
                confirmText: 'Aceptar',
                color: 'warn',
                showCancelButton: false,
            },
        });
    }

    
    showDateValidationError(message: string | null = null) {
        this.dialog.open(DialogBoxComponent, {
            data: {
                title: 'Mensaje de Error',
                message:
                    message || 'La fecha de inicio no puede ser mayor a la fecha de fin',
                confirmText: 'Aceptar',
                color: 'warn',
                showCancelButton: false,
            },
        });
    }

    // DIALOGO DE CONFIRMACIÓN
    showCustomConfirmationMessageOrGeneric(message: string) {
        return this.dialog.open(DialogBoxComponent, {
            width: '400px',
            data: {
                title: 'Mensaje de Confirmación',
                message: message || '¿Estás seguro de guardar esta información?',
                confirmText: 'Aceptar',
                cancelText: 'Cancelar',
                color: 'primary',
                showCancelButton: true,
            },
        });
    }

    // DIALOGO DE INFORMATIVO
    showInfoConfirmationMessageOrGeneric(message: string) {
        return this.dialog.open(DialogBoxComponent, {
            width: '400px',
            data: {
                title: 'Mensaje Informativo',
                message: message || 'Se realizó la acción exitosamente.',
                confirmText: 'Aceptar',
                color: 'primary',
                showCancelButton: false,
            },
        });
    }

    showCustomInfoMessageOrGeneric(message: string) {
        this.dialog.open(DialogBoxComponent, {
            data: {
                title: 'Mensaje Informativo',
                color: 'primary',
                message:
                    message || 'Por favor complete todos los campos requeridos',
                confirmText: 'Aceptar',
            },
        });
    }

    showCustomRequiredFields(message: string | null = null) {
        this.dialog.open(DialogBoxComponent, {
            data: {
                title: 'Mensaje de confirmación',
                message:
                    message || 'Por favor complete todos los campos requeridos',
                confirmText: 'Aceptar',
                color: 'primary',
                showCancelButton: false,
            },
        });
    }

    // error dialog no content, not based on a config
    showSimpleNoContent() {
        return this.dialog.open(DialogBoxComponent, {
            width: '400px',
            data: {
                title: 'Mensaje Informativo',
                message: 'Esta consulta no produjo resultado.',
                confirmText: 'Aceptar',
                color: 'primary',
                showCancelButton: false,
            },
        });
    }

    /**
     * Shows a data loading error dialog
     */
    showDataLoadingError(entityName: string, errorDetails?: string) {
        return this.showErrorDialog({
            title: 'Mensaje de Error',
            message: `Error al cargar los datos de ${entityName}: ${errorDetails || 'No se cargaron los datos correctamente'}`,
        });
    }

    /**
     * Shows a network connection error dialog
     */
    showNetworkError() {
        return this.showErrorDialog({
            title: 'Error de Conexión',
            message: 'Error de conexión. Inténtalo de nuevo más tarde.',
        });
    }

    /**
     * Shows a permission error dialog
     */
    showPermissionError() {
        return this.showErrorDialog({
            title: 'Acceso Denegado',
            message:
                'No tienes permisos suficientes para realizar esta acción.',
        });
    }

    /**
     * Shows a validation error dialog
     */
    showValidationError(message: string) {
        return this.showErrorDialog({
            title: 'Error de Validación',
            message,
        });
    }

    /**
     * Muestra error genérico de acuerdo a código de estado HTTP
     * @param statusCode Código de estado HTTP
     */
    showServerError(statusCode?: number) {
        const message = this.getServerErrorMessage(statusCode);
        return this.showErrorDialog({
            message,
        });
    }

    /**
     * Get appropriate error message based on HTTP status code
     */
    private getServerErrorMessage(statusCode?: number): string {
        switch (statusCode) {
            case 400:
                return 'Solicitud inválida. Verifica los datos enviados.';
            case 401:
                return 'No estás autorizado. Inicia sesión nuevamente.';
            case 403:
                return 'No tienes permisos para realizar esta acción.';
            case 404:
                return 'El recurso solicitado no fue encontrado.';
            case 500:
                return 'Error interno del servidor. Inténtalo más tarde.';
            case 503:
                return 'Servicio temporalmente no disponible.';
            default:
                return 'Error del servidor. Inténtalo de nuevo más tarde.';
        }
    }

    //
    openConfirmationDialog(data: AlertDialogData): Promise<boolean> {
        const dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '400px',
            data: data,
        });

        return dialogRef.afterClosed().toPromise();
    }
}
