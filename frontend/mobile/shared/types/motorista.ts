
export type MotoristaStatus =
  | 'Ativo'
  | 'Inativo';

export interface Motorista {
  /** IDs */
  _id?: string;             // MongoDB padrão
  motoristaId?: string;     // auto: true

  motoristaNome: string;

  motoristaStatus: MotoristaStatus;

  motoristaDataVencimentoHabilitacao: string | Date;

  caminhaoId: string;
  carretaId: string;
}
