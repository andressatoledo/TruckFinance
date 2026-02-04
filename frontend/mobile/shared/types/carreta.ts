// src/types/carreta.ts

export type CarretaStatus =
  | 'Ativo'
  | 'Inativo'
  | 'Manutenção';

export interface Carreta {
  /** IDs */
  _id?: string;          // MongoDB padrão
  carretaId?: string;    // auto: true

  carretaQuantidadeEixosVazio: number;
  carretaQuantidadeEixosCheio: number;

  carretaTipo: string;
  carretaPlaca: string;
  carretaStatus: CarretaStatus;
  carretaEixosVazio: number;
  carretaEixosCheio: number;
}
