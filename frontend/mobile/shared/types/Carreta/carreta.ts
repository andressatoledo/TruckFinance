export const CarretaStatusOptions = [
  'Ativo',
  'Inativo',
  'Manutenção'
] as const;

export const CarretaTipos = [
  'Sider',
  'Baú',
  'Graneleira',
  'Porta contêiner',
  'Cegonha',
  'Tanque',
  'Prancha',
  'Bitrem',
  'Rodotrem',
] as const;

export type CarretaTipo = typeof CarretaTipos[number];
export type CarretaStatus = typeof CarretaStatusOptions[number];

export interface Carreta {
  /** IDs */
  _id?: string; // MongoDB padrão

  carretaPlaca: string;
  carretaTipo: CarretaTipo;
  carretaStatus: CarretaStatus;

  carretaQuantidadeEixosVazio: number;
  carretaQuantidadeEixosCheio: number;
}