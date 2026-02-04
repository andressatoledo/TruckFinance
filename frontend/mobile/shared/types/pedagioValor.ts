export interface PedagioValor {
  /** IDs */
  _id?: string;               // MongoDB padrão
  rotaPedagioValor: number;
  rotaPedagioNumeroEixos: number;

  pedagioId: string;
}
