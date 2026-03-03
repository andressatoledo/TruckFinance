import { useCaminhaoCombo } from '../../src/hooks/useCaminhaoCombo';
import { useCarretaCombo } from '../../src/hooks/useCarretaCombo';
import { useMotoristaCombo } from '../../src/hooks/useMotoristaCombo';

export const comboOptions = {
  caminhao: useCaminhaoCombo,
  carreta: useCarretaCombo,
  motorista: useMotoristaCombo,
};

export type ComboSource = keyof typeof comboOptions;