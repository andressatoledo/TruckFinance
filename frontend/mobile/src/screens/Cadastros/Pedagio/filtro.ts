import { FilterFieldConfig } from '../../../components/Filtro/types';

export const PedagioFiltro: FilterFieldConfig[] = [
  // {
  //   key: 'pedagioNome',
  //   label: 'Nome',
  //   type: 'text',
  //   placeholder: 'Buscar pedágio...',
  // },
  {
    key: 'pedagioRodovia',
    label: 'Rodovia',
    type: 'text',
    placeholder: 'Buscar pedágio por rodovia...'
  },
  {
    key: 'pedagioLocalizacao',
    label: 'Localização',
    type: 'text',
    placeholder: 'Buscar pedágio por localização...'
  },
];
