import { useMemo, useState } from 'react';
import { ThemeType } from '../theme/themeContext';

interface UseCalendarioPersonalizadoProps {
  dataInicio: Date | null;
  dataFim: Date | null;
  onChangeInicio: (date: Date | null) => void;
  onChangeFim: (date: Date | null) => void;
  theme: ThemeType;
}

export function useCalendarioPersonalizado({
  dataInicio,
  dataFim,
  onChangeInicio,
  onChangeFim,
  theme,
}: UseCalendarioPersonalizadoProps) {

      
  const [dataAtual, setDataAtual] = useState(
  dataInicio ?? new Date()
);

  function avancar() {
    setDataAtual(prev => {
      const nova = new Date(prev);
      nova.setMonth(nova.getMonth() + 1);
      return nova;
    });
  }

  function voltar() {
    setDataAtual(prev => {
      const nova = new Date(prev);
      nova.setMonth(nova.getMonth() - 1);
      return nova;
    });
  }

//   function format(date: Date) {
//     return date.toISOString().split('T')[0];
//   }

function format(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


  function selecionarDia(dateString: string) {
  const selecionada = new Date(dateString);

  // ❌ NÃO atualiza dataAtual aqui

  if (!dataInicio || dataFim) {
    onChangeInicio(selecionada);
    onChangeFim(null);
    return;
  }

  if (selecionada >= dataInicio) {
    onChangeFim(selecionada);
  } else {
    onChangeInicio(selecionada);
  }
}



  const mesAnoFormatado = useMemo(() => {
  return dataAtual.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
}, [dataAtual]);


  const inicioFormatado = dataInicio
    ? dataInicio.toLocaleDateString('pt-BR')
    : '--/--/----';

  const fimFormatado = dataFim
    ? dataFim.toLocaleDateString('pt-BR')
    : '--/--/----';

  const markedDates = useMemo(() => {
    const marks: any = {};

    if (dataInicio) {
      marks[format(dataInicio)] = {
        startingDay: true,
        color: theme.colors.detail,
        textColor: theme.colors.text
      };
    }

    if (dataFim) {
      marks[format(dataFim)] = {
        endingDay: true,
        color: theme.colors.detail,
        textColor: theme.colors.text
      };
    }

    return marks;
  }, [dataInicio, dataFim, theme]);

  return {
    dataAtual,
    mesAnoFormatado,
    inicioFormatado,
    fimFormatado,
    markedDates,
    selecionarDia,
    avancar,
    voltar,
    format,
  };
}
