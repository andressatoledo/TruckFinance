export interface PedagioValor {
  /** IDs */
  _id?: string;               // MongoDB padrão
  pedagioValorPedagio: number;
  pedagioValorNumeroEixos: number;
  pedagioId?: string;
}
