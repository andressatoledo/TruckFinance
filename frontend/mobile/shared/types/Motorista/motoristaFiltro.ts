import {MotoristaStatus} from './motoristaStatus';

export interface MotoristaFiltro {
  _id?: string;            
  motoristaNome?: string;
  motoristaStatus?: MotoristaStatus;
  motoristaDataVencimentoHabilitacao?: string | Date;
  caminhaoId?: string;
  carretaId?: string;
}
