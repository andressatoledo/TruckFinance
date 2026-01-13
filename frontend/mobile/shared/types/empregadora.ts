// src/types/empregadora.ts

export type EmpregadoraStatus =
  | 'Ativo'
  | 'Inativo';

export interface Empregadora {
  /** IDs */
  _id?: string;              // MongoDB padrão
  empregadoraId?: string;    // auto: true
  empregadoraNome?: string;
  empregadoraHasAdiantamento: boolean;
  empregadoraValorAdiantamento?: number;

  empregadoraPrazoPagamento: string;

  empregadoraStatus: EmpregadoraStatus;
}


