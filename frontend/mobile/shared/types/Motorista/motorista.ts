import {MotoristaStatus} from './motoristaStatus';

export interface Motorista {
  _id?: string;            
  motoristaNome: string;
  motoristaStatus: MotoristaStatus;
  motoristaDataVencimentoHabilitacao: string | Date;
  caminhaoId: string;
  carretaId: string;
}
