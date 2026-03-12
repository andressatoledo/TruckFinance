import { ManutencaoTipo } from './manutencaoTipo';
import { ManutencaoCategoria } from './manutencaoCategoria';
import { ManutencaoDocumento } from './manutencaoDocumento';

export interface Manutencao {
  _id?: string;
  manutencaoDescricao: string;
  manutencaoTipo: ManutencaoTipo;
  manutencaoCategoria: ManutencaoCategoria;
  manutencaoData: string | Date;
  manutencaoKm: number;
  manutencaoValor?: number;
  manutencaoProximoKm?: number;
  manutencaoProximaData?: string | Date;
  caminhaoId?: string;
  carretaId?: string;
  manutencaoLocal?: string;
  manutencaoObservacao?: string;
   manutencaoDocumentos?: ManutencaoDocumento[];
}