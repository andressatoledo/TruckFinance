import { comboOptions } from '../../../shared/types/Outros/comboOptions';

export const comboConfig = {
  caminhao: {
    hook: comboOptions.caminhao,
    optionsKey: 'optionsCaminhoes',
  },
  carreta: {
    hook: comboOptions.carreta,
    optionsKey: 'optionsCarretas',
  },
  motorista: {
    hook: comboOptions.motorista,
    optionsKey: 'optionsMotoristas',
  },
  carretaTipo: {
    hook: comboOptions.carretaTipo,
    optionsKey: 'optionsCarretaTipos',
  },
  empregadoraStatus: {
    hook: comboOptions.empregadoraStatus,
    optionsKey: 'optionsEmpregadoraStatus',
  },
  manutencaoTipo: {
    hook: comboOptions.manutencaoTipo,
    optionsKey: 'optionsManutencaoTipos',
  },
  manutencaoCategoria: {
    hook: comboOptions.manutencaoCategoria,
    optionsKey: 'optionsManutencaoCategorias',
  },
  empregadoraPrazoPagamento: {
    hook: comboOptions.empregadoraPrazoPagamento,
    optionsKey: 'optionsEmpregadoraPrazoPagamentos',
  },
};