export interface RotaPedagio {
  /** IDs */
  _id?: string;           // MongoDB padrão
  rotaPedagioOrdem?: number;
  rotaPedagioNome: string;

  rotaId: string;
  pedagioId: string;
}
