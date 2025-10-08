import { ClientePrestamo } from "../cliente/cliente-prestamo.model";
import { Documento } from "../documento/documento.model";

export interface PrestamoMaestroRequest {
  numeroPagare: string;
  clientePrestamo: ClientePrestamo;
  montoAprobado: number;
  montoDesembolsado: number;
  fechaAdjudicacion: string; // ISO string
  fechaVencimiento: string; // ISO string
  documentoInforme: Documento;
  documentoActaInicioAccionLegal: Documento;
  secuencialOficina: number;
  codigoUsuario: string;
  fechaSistema: string; // ISO string
  estaActivo: number;
}