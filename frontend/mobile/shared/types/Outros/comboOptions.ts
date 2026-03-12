import { useCaminhaoCombo } from '../../../src/hooks/Caminhao/useCaminhaoCombo';
import { useCarretaCombo } from '../../../src/hooks/Carreta/useCarretaCombo';
import { useMotoristaCombo } from '../../../src/hooks/Motorista/useMotoristaCombo';
import { useCarretaTipoCombo } from '../../../src/hooks/Carreta/useCarretaTipoCombo'; //Enum
import { useEmpregadoraStatusCombo } from '../../../src/hooks/Empregadora/useEmpregadoraStatusCombo'; //Enum
import { useEmpregadoraPrazoPagamentoCombo } from '../../../src/hooks/Empregadora/useEmpregadoraPrazoPagamentoCombo.ts'; //Enum
import { useManutencaoTipoCombo } from '../../../src/hooks/Manutencao/useManutencaoTipoCombo'; //Enum
import { useManutencaoCategoriaCombo } from '../../../src/hooks/Manutencao/useManutencaoCategoriaCombo'; //Enum

export const comboOptions = {
  caminhao: useCaminhaoCombo,
  carreta: useCarretaCombo,
  motorista: useMotoristaCombo,
  carretaTipo: useCarretaTipoCombo,
  empregadoraStatus: useEmpregadoraStatusCombo,
  empregadoraPrazoPagamento: useEmpregadoraPrazoPagamentoCombo,
  manutencaoTipo: useManutencaoTipoCombo,
  manutencaoCategoria: useManutencaoCategoriaCombo,
};

export type ComboSource = keyof typeof comboOptions;