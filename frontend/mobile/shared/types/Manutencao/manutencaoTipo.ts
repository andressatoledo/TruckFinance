export const ManutencaoTipoOptions = ['Preventiva', 'Corretiva'] as const;

export type ManutencaoTipo = (typeof ManutencaoTipoOptions)[number];
