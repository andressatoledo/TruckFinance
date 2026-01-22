import { opcoesCalendario } from '../../shared/types/opcoesCalendario';
import { capitalize } from '../../shared/utils/capitalize';
export interface calendarioProps {
  opcao: opcoesCalendario;
  ano?: number;
  mes?: number;
  dataInicio?: Date;
  dataFim?: Date;
  children?: React.ReactNode;
}

interface calendarioReturn {
  principal: string;
  secundario: string;
  detalhe: string;
  dataInicio?: Date;
  dataFim?: Date;
}

export function definirCalendario(calendarioProps: calendarioProps) {
  const calendarioReturn: calendarioReturn = {
    principal: '',
    secundario: '',
    detalhe: '',
  };

  let { opcao, ano, mes, dataInicio, dataFim } = calendarioProps;

  var dataAtual = new Date();

  if (!dataInicio) {
    dataInicio = dataAtual;
  }

  if (!ano) {
    ano = dataAtual.getFullYear();
  }

  if (opcao === opcoesCalendario.quinzenal) {
    if (dataInicio.getDate() <= 15) {
      calendarioReturn.principal = `1ª QUINZENA`;
      calendarioReturn.secundario = capitalize(
        `${dataInicio.toLocaleString('default', {
          month: 'long',
        })} ${dataInicio.getFullYear()}`,
      );
      calendarioReturn.detalhe = `01/${dataInicio.toLocaleString('default', {
        month: '2-digit',
      })} - 15/${dataInicio.toLocaleString('default', { month: '2-digit' })}`;
      calendarioReturn.dataInicio = new Date(
        dataInicio.getFullYear(),
        dataInicio.getMonth(),
        1,
      );
      calendarioReturn.dataFim = new Date(
        dataInicio.getFullYear(),
        dataInicio.getMonth(),
        15,
      );
    } else {
      calendarioReturn.principal = `2ª QUINZENA`;
      calendarioReturn.secundario = capitalize(
        `${dataInicio.toLocaleString('default', {
          month: 'long',
        })} ${dataInicio.getFullYear()}`,
      );
      calendarioReturn.detalhe = `16/${dataInicio.toLocaleString('default', {
        month: '2-digit',
      })} - ${new Date(
        dataInicio.getFullYear(),
        dataInicio.getMonth() + 1,
        0,
      ).getDate()}/${dataInicio.toLocaleString('default', {
        month: '2-digit',
      })}`;
      calendarioReturn.dataInicio = new Date(
        dataInicio.getFullYear(),
        dataInicio.getMonth(),
        16,
      );
      calendarioReturn.dataFim = new Date(
        dataInicio.getFullYear(),
        dataInicio.getMonth() + 1,
        0,
      );
    }
  }

  if (opcao === opcoesCalendario.mensal && mes !== undefined) {
    const dataMes = new Date(ano, mes - 1);

    calendarioReturn.principal = dataMes.toLocaleString('default', {
      month: 'long',
    }).toUpperCase();

    calendarioReturn.secundario = `${ano}`;

    calendarioReturn.detalhe = `01/${dataMes.toLocaleString('default', {
      month: '2-digit',
    })} - ${new Date(ano, mes, 0).getDate()}/${dataMes.toLocaleString(
      'default',
      {
        month: '2-digit',
      },
    )}`;

    calendarioReturn.dataInicio = new Date(ano, mes - 1, 1);
    calendarioReturn.dataFim = new Date(ano, mes, 0);
  }

  if (opcao === opcoesCalendario.anual) {
    calendarioReturn.principal = `${ano}`;
    calendarioReturn.secundario = ``;
    calendarioReturn.detalhe = `01/01/${ano} - 31/12/${ano}`;
    calendarioReturn.dataInicio = new Date(ano, 0, 1);
    calendarioReturn.dataFim = new Date(ano, 11, 31);
  }

  if (opcao === opcoesCalendario.personalizado && dataInicio && dataFim) {
    calendarioReturn.principal = `Personalizado`;
    calendarioReturn.secundario = ``;
    calendarioReturn.detalhe = `${dataInicio
      .getDate()
      .toString()
      .padStart(2, '0')}/${(dataInicio.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${dataInicio.getFullYear()} - ${dataFim
      .getDate()
      .toString()
      .padStart(2, '0')}/${(dataFim.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${dataFim.getFullYear()}`;
    calendarioReturn.dataInicio = dataInicio;
    calendarioReturn.dataFim = dataFim;
  }
  return calendarioReturn;
}
