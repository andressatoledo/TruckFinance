export interface Rota {
  _id?: string;       
  rotaNome: string;
  rotaDescricao: string;
  rotaOrigem: string;
  rotaDestino: string;
  rotaObservacao?: string;
  rotaDistancia?: number;
}
