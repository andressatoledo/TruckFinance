import { useEffect, useState } from 'react';
import { EmpregadoraPrazoPagamentoOptions } from '../../../shared/types/Empregadora/empregadoraPrazoPagamento';
import {ComboOption} from '../../../shared/types/Outros/comboOption';


export function useEmpregadoraPrazoPagamentoCombo() {
  const [optionsEmpregadoraPrazoPagamentos, setOptions] = useState<ComboOption[]>([]);
  const [loadingEmpregadoraPrazoPagamentos, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const mapped = Object.entries(EmpregadoraPrazoPagamentoOptions).map(([key,value]) => ({
          value: EmpregadoraPrazoPagamentoOptions[Number(key)].toString(),
          label: value,
        }));
    
        setOptions(mapped);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { optionsEmpregadoraPrazoPagamentos, loadingEmpregadoraPrazoPagamentos };
}