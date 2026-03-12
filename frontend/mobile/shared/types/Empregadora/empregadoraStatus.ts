export const EmpregadoraStatusOptions = ['Ativo', 'Inativo'] as const;

export type EmpregadoraStatus = (typeof EmpregadoraStatusOptions)[number];
