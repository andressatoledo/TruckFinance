import { ManutencaoTipo } from './manutencaoTipo';
import { ManutencaoCategoria } from './manutencaoCategoria';
import { ManutencaoDocumento } from './manutencaoDocumento';

type Caminhao = {
  _id: string;
  caminhaoNome: string;
  caminhaoPlaca: string;
};

type Carreta = {
  _id: string;
  carretaTipo: string;
  carretaPlaca: string;
};


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
  caminhaoId?: Caminhao;
  carretaId?: Carreta;
  manutencaoLocal?: string;
  manutencaoObservacao?: string;
   manutencaoDocumentos?: ManutencaoDocumento[];
}