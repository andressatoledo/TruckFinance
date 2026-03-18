import { FilterFieldConfig } from '../../../components/Filtro/types';

export const EmpregadoraFiltro: FilterFieldConfig[] = [
  {
    key: 'empregadoraHasAdiantamento',
    label: 'Possui adiantamento',
    type: 'boolean',
    placeholder: 'Filtrar por adiantamento',
  },

  {
    key: 'empregadoraValorAdiantamentoMin',
    label: 'Adiantamento (mínimo)',
    type: 'number',
    placeholder: 'Valor mínimo do adiantamento',
  },
  {
    key: 'empregadoraValorAdiantamentoMax',
    label: 'Adiantamento (máximo)',
    type: 'number',
    placeholder: 'Valor máximo do adiantamento',
  },

  {
    key: 'empregadoraPrazoPagamento',
    label: 'Prazo de pagamento',
    type: 'combo',
    source: 'empregadoraPrazoPagamento',
    placeholder: 'Selecionar prazo de pagamento',
  },

  {
    key: 'empregadoraStatus',
    label: 'Status',
    type: 'combo',
    source: 'empregadoraStatus',
    placeholder: 'Selecionar status',
  },

];