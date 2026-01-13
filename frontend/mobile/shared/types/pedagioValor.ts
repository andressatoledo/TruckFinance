export interface PedagioValor {
  /** IDs */
  _id?: string;               // MongoDB padrão
  pedagioValorId?: string;    // auto: true

  rotaPedagioValor: number;
  rotaPedagioTipoEixo: string;

  pedagioId: string;
}
