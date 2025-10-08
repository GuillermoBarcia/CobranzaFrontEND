export interface Documento {
  codigoTipoDocumento: string;
  documentoDecodificado: string; // Base64 para varbinary en el backend
  descripcion: string;
  codigoUsuario: string;
  fechaSistema: string; // ISO string
  estaActivo: number;
}