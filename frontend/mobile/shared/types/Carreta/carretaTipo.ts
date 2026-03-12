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