import { FilterFieldConfig } from '../../../components/Filtro/types';

export const ManutencaoFiltro: FilterFieldConfig[] = [
  {
    key: 'manutencaoDescricao',
    label: 'Descrição',
    type: 'text',
    placeholder: 'Filtrar por descrição',
  },

  {
    key: 'manutencaoValorMin',
    label: 'Valor (mínimo)',
    type: 'number',
    placeholder: 'Valor mínimo da manutenção',
  },
  {
    key: 'manutencaoValorMax',
    label: 'Valor (máximo)',
    type: 'number',
    placeholder: 'Valor máximo da manutenção',
  },

  {
    key: 'manutencaoDataMin',
    label: 'Data da manutenção (mínima)',
    type: 'date',
    placeholder: 'Selecionar data mínima',
  },

  {
    key: 'manutencaoDataMax',
    label: 'Data da manutenção (máxima)',
    type: 'date',
    placeholder: 'Selecionar data máxima',
  },

  {
    key: 'manutencaoTipo',
    label: 'Tipo',
    type: 'combo',
    source: 'manutencaoTipo',
    placeholder: 'Selecionar tipo da manutenção',
  },

  {
    key: 'manutencaoCategoria',
    label: 'Categoria',
    type: 'combo',
    source: 'manutencaoCategoria',
    placeholder: 'Selecionar categoria da manutenção',
  },

  {
    key: 'caminhaoId',
    label: 'Caminhão',
    type: 'combo',
    source: 'caminhao',
    placeholder: 'Selecionar caminhão',
  },

  {
    key: 'carretaId',
    label: 'Carreta',
    type: 'combo',
    source: 'carreta',
    placeholder: 'Selecionar carreta',
  },

   {
    key: 'manutencaoLocal',
    label: 'Local',
    type: 'text',
    placeholder: 'Filtrar por local',
  },

   {
    key: 'manutencaoObservacao',
    label: 'Observação',
    type: 'text',
    placeholder: 'Filtrar por observação',
  },

];