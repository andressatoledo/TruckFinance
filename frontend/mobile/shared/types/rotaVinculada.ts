export type RotaVinculadaModeloPagamento = string;

export interface RotaVinculada {
  /** IDs */
  _id?: string;                // MongoDB padrão
  rotaVinculadaObservacao: string;
  rotaVinculadaValor: number;
  rotaVinculadaModeloPagamento: RotaVinculadaModeloPagamento;
  rotaIdaId?: string;
  rotaVoltaId?: string;
  cargaId?: string;
}
