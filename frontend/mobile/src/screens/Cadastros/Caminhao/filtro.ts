import { FilterFieldConfig } from '../../../components/Filtro/types';

export const CaminhaoFiltro: FilterFieldConfig[] = [

  {
    key: 'caminhaoPlaca',
    label: 'Placa',
    type: 'text',
    placeholder: 'Buscar por placa'
  },

  {
    key: 'caminhaoAnoFabricacaoMin',
    label: 'Ano fabricação (mínimo)',
    type: 'number',
    placeholder: 'Ano mínimo'
  },
  {
    key: 'caminhaoAnoFabricacaoMax',
    label: 'Ano fabricação (máximo)',
    type: 'number',
    placeholder: 'Ano máximo'
  },

   {
    key: 'caminhaoDataUltimaManutencaoInicio ',
    label: 'Data da última manutenção (início)',
    type: 'date',
    placeholder: 'Data de início'
  },
  {
    key: 'caminhaoDataUltimaManutencaoFim',
    label: 'Data da última manutenção (fim)',
    type: 'date',
    placeholder: 'Data de fim'
  },

  {
    key: 'caminhaoCapacidadeDeCargaMin',
    label: 'Capacidade mínima',
    type: 'number',
    placeholder: 'Capacidade mínima'
  },
  {
    key: 'caminhaoCapacidadeDeCargaMax',
    label: 'Capacidade máxima',
    type: 'number',
    placeholder: 'Capacidade máxima'
  },

  
  {
    key: 'caminhaoEixosVazioMin',
    label: 'Eixos vazio (mínimo)',
    type: 'number',
    placeholder: 'Mínimo de eixos vazio'
  },
  {
    key: 'caminhaoEixosVazioMax',
    label: 'Eixos vazio (máximo)',
    type: 'number',
    placeholder: 'Máximo de eixos vazio'
  },

  {
    key: 'caminhaoEixosCheioMin',
    label: 'Eixos cheio (mínimo)',
    type: 'number',
    placeholder: 'Mínimo de eixos cheio'
  },
  {
    key: 'caminhaoEixosCheioMax',
    label: 'Eixos cheio (máximo)',
    type: 'number',
    placeholder: 'Máximo de eixos cheio'
  },

  {
    key: 'caminhaoObservacao',
    label: 'Observação',
    type: 'text',
    placeholder: 'Buscar por observação'
  },

  {
    key: 'caminhaoDocumentos',
    label: 'Documentos',
    type: 'text',
    placeholder: 'Buscar por documentos'
  }
];