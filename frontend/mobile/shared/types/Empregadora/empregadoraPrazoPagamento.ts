export const EmpregadoraPrazoPagamentoOptions = ['15 dias','30 dias', '60 dias', '90 dias'] as const;

export type EmpregadoraPrazoPagamento = (typeof EmpregadoraPrazoPagamentoOptions)[number];
