export interface ApiResponse<T> {
  estadoTransaccion: boolean;
  codigoerror: string;
  detalleError: string;
  jsonObject: T;
}