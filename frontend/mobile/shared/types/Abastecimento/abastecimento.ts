

export interface Abastecimento {
  _id?: string;                 // MongoDB padrão
  abastecimentoLitros: number;
  abastecimentoValor: number;

  abastecimentoData: string | Date;

  abastecimentoKm?: number;

  abastecimentoTipoPagamento?: string;
  abastecimentoPrazoPagamento?: string;

  abastecimentoObservacao?: string;
  caminhaoId: string;
}
