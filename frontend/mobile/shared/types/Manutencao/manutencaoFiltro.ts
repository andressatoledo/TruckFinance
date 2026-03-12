import { ManutencaoTipo } from './manutencaoTipo';
import { ManutencaoCategoria } from './manutencaoCategoria';

export interface ManutencaoFiltro {
  _id?: string;

  manutencaoDescricao?: string;

  manutencaoTipo?: ManutencaoTipo;
  manutencaoCategoria?: ManutencaoCategoria;

  manutencaoDataInicial?: string | Date;
  manutencaoDataFinal?: string | Date;

  manutencaoKmMin?: number;
  manutencaoKmMax?: number;

  manutencaoValorMin?: number;
  manutencaoValorMax?: number;

  manutencaoProximoKmMin?: number;
  manutencaoProximoKmMax?: number;

  manutencaoProximaDataInicial?: string | Date;
  manutencaoProximaDataFinal?: string | Date;

  caminhaoId?: string;
  carretaId?: string;

  manutencaoLocal?: string;
}