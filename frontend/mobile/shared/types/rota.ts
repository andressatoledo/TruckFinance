export interface Rota {
  /** IDs */
  _id?: string;       // MongoDB padrão
  rotaNome: string;
  rotaDescricao: string;

  rotaOrigem: string;
  rotaDestino: string;

  rotaObservacao?: string;
  rotaDistancia?: number;
}
