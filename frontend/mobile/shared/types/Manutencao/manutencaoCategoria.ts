export const ManutencaoCategoriaOptions = [
  'Óleo do motor',
  'Filtro de óleo',
  'Filtro de ar',
  'Filtro de combustível',
  'Pneus',
  'Alinhamento',
  'Balanceamento',
  'Freios',
  'Embreagem',
  'Suspensão',
  'Caixa de câmbio',
  'Diferencial',
  'Sistema elétrico',
  'Bateria',
  'Radiador',
  'Injeção eletrônica',
  'Turbina',
  'Cardã',
  'Quinta roda',
  'Ar-condicionado',
  'Lataria/Pintura',
  'Outro'
] as const;

export type ManutencaoCategoria =
  (typeof ManutencaoCategoriaOptions)[number];