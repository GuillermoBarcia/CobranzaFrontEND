
export interface UnidadJudicial {
  secuencial: number;
  secuencialCanton: number;
  nombre: string;
  estaActivo: number; // Puedes mapearlo a boolean si quieres, pero lo dejo como number por el JSON
}