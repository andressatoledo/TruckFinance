

export interface Abastecimento {
  _id?: string;                 
  abastecimentoLitros: number;
  abastecimentoValor: number;
  abastecimentoData: string | Date;
  abastecimentoKm?: number;
  abastecimentoTipoPagamento?: string;
  abastecimentoPrazoPagamento?: string;
  abastecimentoObservacao?: string;
  caminhaoId: string;
}
