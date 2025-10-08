export interface PrestamoMaestroResponse {
  estadoTransaccion: boolean;
  codigoerror: string;
  detalleError: string;
  jsonObject: {
    secuencial: number;
    numeroPagare: string;
    secuencialCliente: number;
    nombreCliente: string;
    montoAprobado: number;
    montoDesembolsado: number;
    fechaAdjudicacion: string;
    fechaVencimiento: string;
    secuencialDocumentoInforme: number;
    secuencialActaInicioAccionLegal: number;
    secuencialOficina: number;
    codigoUsuario: string;
    fechaSistema: string;
    estaActivo: number;
  };
}