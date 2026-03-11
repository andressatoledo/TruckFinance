import { useCaminhaoCombo } from '../../src/hooks/useCaminhaoCombo';
import { useCarretaCombo } from '../../src/hooks/useCarretaCombo';
import { useMotoristaCombo } from '../../src/hooks/useMotoristaCombo';
import { useCarretaTipoCombo } from '../../src/hooks/Carreta/useCarretaTipoCombo'; //Enum

export const comboOptions = {
  caminhao: useCaminhaoCombo,
  carreta: useCarretaCombo,
  motorista: useMotoristaCombo,
  carretaTipo: useCarretaTipoCombo
};

export type ComboSource = keyof typeof comboOptions;