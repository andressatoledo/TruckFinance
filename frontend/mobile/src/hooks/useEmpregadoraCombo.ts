import { useEffect, useState } from 'react';
import { EmpregadoraService } from '../../shared/services/empregadoraService';

interface ComboOption {
  label: string;
  value: string;
}

export function useEmpregadoraCombo() {
  const [optionsEmpregadoras, setOptions] = useState<ComboOption[]>([]);
  const [loadingEmpregadoras, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await EmpregadoraService.buscarCombo();

        const mapped = data.map((rv) => ({
          value: rv.value,
          label: rv.label,
        }));

        setOptions(mapped);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { optionsEmpregadoras, loadingEmpregadoras: loadingEmpregadoras };
}
