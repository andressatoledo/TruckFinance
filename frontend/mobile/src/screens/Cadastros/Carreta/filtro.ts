import { FilterFieldConfig } from '../../../components/Filtro/types';

export const CarretaFiltro: FilterFieldConfig[] = [

  {
    key: 'carretaTipo',
    label: 'Tipo da carreta',
    type: 'combo',
    placeholder: 'Buscar por tipo da carreta',
  },

  {
    key: 'carretaQuantidadeEixosVazioMin',
    label: 'Eixos vazio (mínimo)',
    type: 'number',
    placeholder: 'Mínimo de eixos vazio'
  },
  {
    key: 'carretaQuantidadeEixosVazioMax',
    label: 'Eixos vazio (máximo)',
    type: 'number',
    placeholder: 'Máximo de eixos vazio'
  },

  {
    key: 'carretaQuantidadeEixosCheioMin',
    label: 'Eixos cheio (mínimo)',
    type: 'number',
    placeholder: 'Mínimo de eixos cheio'
  },
  {
    key: 'carretaQuantidadeEixosCheioMax',
    label: 'Eixos cheio (máximo)',
    type: 'number',
    placeholder: 'Máximo de eixos cheio'
  },


];