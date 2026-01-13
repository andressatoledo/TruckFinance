export interface Carga {
  /** IDs */
  _id?: string;        // MongoDB padrão
  cargaId?: string;    // auto: true no schema
  cargaTipo: string;
}
