export const CarretaStatusOptions = [
  'Ativo',
  'Inativo',
  'Manutenção'
] as const;

export type CarretaStatus = typeof CarretaStatusOptions[number];
