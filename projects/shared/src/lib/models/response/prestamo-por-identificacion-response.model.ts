export interface SecuencialClienteNavigation {
  identificaClienteExterno: number;
  identificacion: string;
  nombre: string;
  apellido: string;
  estaActivo: number;
}

export interface SecuencialDocumentoInformeNavigation {
  secuencial: number;
}

export interface SecuencialOficinaNavigation {
  secuencial: number;
  identificadorExterno: number;
  nombre: string;
  estaActiva: number;
}

export interface PrestamoPorIdentificacionResponseItem {
  numeroPagare: string;
  secuencialClienteNavigation: SecuencialClienteNavigation;
  montoAprobado: number;
  montoDesembolsado: number;
  fechaAdjudicacion: string;
  fechaVencimiento: string;
  secuencialOficinaNavigation: SecuencialOficinaNavigation;
  secuencialDocumentoInformeNavigation: SecuencialDocumentoInformeNavigation;
}

export interface PrestamoPorIdentificacionResponse {
  estadoTransaccion: boolean;
  codigoerror: string;
  detalleError: string;
  jsonObject: PrestamoPorIdentificacionResponseItem[];
}