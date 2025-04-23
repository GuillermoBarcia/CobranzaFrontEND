export interface Sapcedi {
  numeroConsolidacion: number;                // Ej: 10184 (N. Consolidación)
  proveedor: string;         // Ej: "TROPICALIMENTOS S.A"
  fechaPropuesta: Date;      // Ej: "lun. 07/04/2025" (convertir a Date)
  horaInicialPropuesta: string; // Ej: "06:00"
  horaFinPropuesta: string;   // Ej: "07:30"
  observacion: string;        // Ej: "POR PRUEBA"
}
