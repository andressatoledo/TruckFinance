
export type AbastecimentoTipoPagamento = string;

export interface Abastecimento {
  _id?: string;                 // MongoDB padrão
  abastecimentoId?: string;     // auto: true no schema

  abastecimentoLitros: number;
  abastecimentoValor: number;

  abastecimentoData?: string | Date;

  abastecimentoKm: number;

  abastecimentoTipoPagamento: AbastecimentoTipoPagamento;
  abastecimentoPrazoPagamento: string;

  abastecimentoObservacao?: string;
}
