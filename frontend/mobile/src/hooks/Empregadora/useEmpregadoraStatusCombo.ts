import { useEffect, useState } from 'react';
import { EmpregadoraStatusOptions } from '../../../shared/types/Empregadora/empregadoraStatus';
import {ComboOption} from '../../../shared/types/Outros/comboOption';


export function useEmpregadoraStatusCombo() {
  const [optionsEmpregadoraStatus, setOptions] = useState<ComboOption[]>([]);
  const [loadingEmpregadoraStatus, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const mapped = Object.entries(EmpregadoraStatusOptions).map(([key,value]) => ({
          value: EmpregadoraStatusOptions[Number(key)].toString(),
          label: value,
        }));
    
        setOptions(mapped);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { optionsEmpregadoraStatus, loadingEmpregadoraStatus };
}