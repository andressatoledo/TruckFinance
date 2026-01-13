export interface Rota {
  /** IDs */
  _id?: string;       // MongoDB padrão
  rotaId?: string;    // auto: true

  rotaNome: string;
  rotaDescricao: string;

  rotaOrigem: string;
  rotaDestino: string;

  rotaObservacao?: string;
  rotaDistancia?: number;
}
