export const TipoPagamentoEnum = {
  DINHEIRO: 'DINHEIRO',
  PIX: 'PIX',
  CARTAO_DEBITO: 'CARTAO_DEBITO',
  CARTAO_CREDITO: 'CARTAO_CREDITO',
  BOLETO: 'BOLETO',
  TRANSFERENCIA: 'TRANSFERENCIA',
  A_PRAZO: 'A_PRAZO',
} as const;



  export const ParcelamentoEnum = {
  A_VISTA: 'A_VISTA',
  UMA_VEZ: '1X',
  DUAS_VEZES: '2X',
  TRES_VEZES: '3X',
  QUATRO_VEZES: '4X',
  CINCO_VEZES: '5X',
  SEIS_VEZES: '6X',
  SETE_VEZES: '7X',
  OITO_VEZES: '8X',
  NOVE_VEZES: '9X',
  DEZ_VEZES: '10X',
  ONZE_VEZES: '11X',
  DOZE_VEZES: '12X',
} as const;

export type Parcelamento =
  (typeof ParcelamentoEnum)[keyof typeof ParcelamentoEnum];

  export type TipoPagamento =
  (typeof TipoPagamentoEnum)[keyof typeof TipoPagamentoEnum];

export const prazoOptions = [
  { label: 'À vista', value: ParcelamentoEnum.A_VISTA },
  { label: '1x', value: ParcelamentoEnum.UMA_VEZ },
  { label: '2x', value: ParcelamentoEnum.DUAS_VEZES },
  { label: '3x', value: ParcelamentoEnum.TRES_VEZES },
  { label: '4x', value: ParcelamentoEnum.QUATRO_VEZES },
  { label: '5x', value: ParcelamentoEnum.CINCO_VEZES },
  { label: '6x', value: ParcelamentoEnum.SEIS_VEZES },
  { label: '7x', value: ParcelamentoEnum.SETE_VEZES },
  { label: '8x', value: ParcelamentoEnum.OITO_VEZES },
  { label: '9x', value: ParcelamentoEnum.NOVE_VEZES },
  { label: '10x', value: ParcelamentoEnum.DEZ_VEZES },
  { label: '11x', value: ParcelamentoEnum.ONZE_VEZES },
  { label: '12x', value: ParcelamentoEnum.DOZE_VEZES },
];

export const tipoPagamentoOptions = [
  { label: 'Dinheiro', value: TipoPagamentoEnum.DINHEIRO },
  { label: 'PIX', value: TipoPagamentoEnum.PIX },
  { label: 'Cartão de Débito', value: TipoPagamentoEnum.CARTAO_DEBITO },
  { label: 'Cartão de Crédito', value: TipoPagamentoEnum.CARTAO_CREDITO },
  { label: 'Boleto', value: TipoPagamentoEnum.BOLETO },
  { label: 'Transferência', value: TipoPagamentoEnum.TRANSFERENCIA },
  { label: 'A Prazo', value: TipoPagamentoEnum.A_PRAZO },
];

