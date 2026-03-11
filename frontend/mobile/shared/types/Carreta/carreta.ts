
export const CarretaStatus = [
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
export type CarretaStatus = typeof CarretaStatus[number];


export interface Carreta {
  /** IDs */
  _id?: string;          // MongoDB padrão
  carretaId?: string;    // auto: true

  carretaQuantidadeEixosVazio: number;
  carretaQuantidadeEixosCheio: number;

  carretaTipo: CarretaTipo;
  carretaPlaca: string;
  carretaStatus: CarretaStatus;
  carretaEixosVazio: number;
  carretaEixosCheio: number;
}
