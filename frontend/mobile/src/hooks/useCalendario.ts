import { useMemo, useState } from 'react';
import { opcoesCalendario } from '../../shared/types/opcoesCalendario';
import { definirCalendario } from '../services/filtrarViagem';

export function useCalendario() {

    const [dataInicio, setDataInicio] = useState<Date | null>(null);
    const [dataFim, setDataFim] = useState<Date | null>(null);

  // opção selecionada (tag)
  const [opcao, setOpcao] = useState<opcoesCalendario>(
    opcoesCalendario.quinzenal
  );

  // data base que controla tudo
  const [dataBase, setDataBase] = useState<Date>(new Date());

  // dados prontos para a UI
  const calendario = useMemo(() => {
  return definirCalendario({
    opcao,
    ano: dataBase.getFullYear(),
    mes: dataBase.getMonth() + 1,
    dataInicio: opcao === opcoesCalendario.personalizado ? dataInicio ?? undefined : dataBase,
    dataFim: opcao === opcoesCalendario.personalizado ? dataFim ?? undefined : undefined,
  });
}, [opcao, dataBase, dataInicio, dataFim]);


  /**
   * 👉 TROCAR OPÇÃO (TAG)
   * Ajusta a data base para não gerar estados inválidos
   */
  function trocarOpcao(novaOpcao: opcoesCalendario) {
    setOpcao(novaOpcao);

    setDataBase((prev) => {
      const nova = new Date(prev);

      if (novaOpcao === opcoesCalendario.mensal) {
        nova.setDate(1);
      }

      if (novaOpcao === opcoesCalendario.anual) {
        nova.setMonth(0);
        nova.setDate(1);
      }

      if (novaOpcao !== opcoesCalendario.personalizado) {
        setDataInicio(null);
        setDataFim(null);
    }

      // quinzenal mantém o dia
      return nova;
    });
  }

  /**
   * 👉 AVANÇAR (→)
   */
  function avancar() {
    setDataBase((prev) => {
      const nova = new Date(prev);

      if (opcao === opcoesCalendario.quinzenal) {
        if (prev.getDate() <= 15) {
          nova.setDate(16);
        } else {
          nova.setMonth(prev.getMonth() + 1);
          nova.setDate(1);
        }
      }

      if (opcao === opcoesCalendario.mensal) {
        nova.setMonth(prev.getMonth() + 1);
        nova.setDate(1);
      }

      if (opcao === opcoesCalendario.anual) {
        nova.setFullYear(prev.getFullYear() + 1);
        nova.setMonth(0);
        nova.setDate(1);
      }

      return nova;
    });
  }

  /**
   * 👉 VOLTAR (←)
   */
  function voltar() {
    setDataBase((prev) => {
      const nova = new Date(prev);

      if (opcao === opcoesCalendario.quinzenal) {
        if (prev.getDate() > 15) {
          nova.setDate(1);
        } else {
          nova.setMonth(prev.getMonth() - 1);
          nova.setDate(16);
        }
      }

      if (opcao === opcoesCalendario.mensal) {
        nova.setMonth(prev.getMonth() - 1);
        nova.setDate(1);
      }

      if (opcao === opcoesCalendario.anual) {
        nova.setFullYear(prev.getFullYear() - 1);
        nova.setMonth(0);
        nova.setDate(1);
      }

      return nova;
    });
  }

 return {
  opcao,
  calendario,
  trocarOpcao,
  avancar,
  voltar,
  dataInicio,
  dataFim,
  setDataInicio,
  setDataFim,
};
}
