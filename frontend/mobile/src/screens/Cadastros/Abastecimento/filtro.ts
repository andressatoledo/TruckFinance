import { FilterFieldConfig } from '../../../components/Filtro/types';

export const AbastecimentoFiltro: FilterFieldConfig[] = [
  // 🔹 Litros (range)
  {
    key: 'abastecimentoLitrosMin',
    label: 'Litros (mínimo)',
    type: 'number',
    placeholder: 'Mínimo de litros'
  },
  {
    key: 'abastecimentoLitrosMax',
    label: 'Litros (máximo)',
    type: 'number',
    placeholder: 'Máximo de litros'
  },

  // 🔹 Valor (range)
  {
    key: 'abastecimentoValorMin',
    label: 'Valor mínimo (R$)',
    type: 'number',
    placeholder: 'Valor mínimo'
  },
  {
    key: 'abastecimentoValorMax',
    label: 'Valor máximo (R$)',
    type: 'number',
    placeholder: 'Valor máximo'
  },

  // 🔹 Data (intervalo)
  {
    key: 'abastecimentoDataInicio',
    label: 'Data início',
    type: 'date',
    placeholder: 'Data inicial'
  },
  {
    key: 'abastecimentoDataFim',
    label: 'Data fim',
    type: 'date',
    placeholder: 'Data final'
  },

  // 🔹 KM
  {
    key: 'abastecimentoKmMin',
    label: 'Km mínimo',
    type: 'number',
    placeholder: 'Km mínimo'
  },
  {
    key: 'abastecimentoKmMax',
    label: 'Km máximo',
    type: 'number',
    placeholder: 'Km máximo'
  },

  // 🔹 Tipo pagamento
  {
    key: 'abastecimentoTipoPagamento',
    label: 'Tipo de pagamento',
    type: 'text',
    placeholder: 'Ex: Pix, Cartão'
  },

  // 🔹 Observação
  {
    key: 'abastecimentoObservacao',
    label: 'Observação',
    type: 'text',
    placeholder: 'Buscar por observação'
  },

  // 🔹 Caminhão
  {
    key: 'caminhaoId',
    label: 'Caminhão',
    type: 'combo',
    source: 'caminhao'
  },
];
