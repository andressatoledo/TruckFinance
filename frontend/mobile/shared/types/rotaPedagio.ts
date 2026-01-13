export interface RotaPedagio {
  /** IDs */
  _id?: string;           // MongoDB padrão
  rotaPedagioId?: string; // auto: true

  rotaPedagioOrdem?: number;
  rotaPedagioNome: string;

  rotaId: string;
  pedagioId: string;
}
