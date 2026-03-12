import { ViagemStatus } from '../../../shared/types/Viagem/viagem';
import { useTheme } from '../../theme/themeContext';
import { useMemo } from 'react';

export function useStatusColors(value: ViagemStatus) {
  const { theme } = useTheme();

  return useMemo(() => {
  const map = {
    Pago: theme.colors.success,
    AguardandoPagamento: theme.colors.warning
  };

  const valor = {
    Pago: 'Pago',
    AguardandoPagamento: 'Aguardando pagamento'
  };

  const color = map[value] ?? theme.colors.text;

  return {
    textColor: color,
    backgroundColor: color,
    value: valor[value]
  };
}, [value, theme]);

}
