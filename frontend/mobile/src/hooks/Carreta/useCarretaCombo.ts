import { useEffect, useState } from 'react';
import { CarretaService } from '../../../shared/services/carretaService';

interface ComboOption {
  label: string;
  value: string;
}

export function useCarretaCombo() {
  const [optionsCarretas, setOptions] = useState<ComboOption[]>([]);
  const [loadingCarretas, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await CarretaService.buscarCombo();

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

  return { optionsCarretas, loadingCarretas: loadingCarretas };
}
