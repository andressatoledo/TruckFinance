import { useEffect, useState } from 'react';
import { RotaVinculadaService } from '../../shared/services/rotaVinculadaService';

interface ComboOption {
  label: string;
  value: string;
}

export function useRotaVinculadaCombo() {
  const [optionsRotas, setOptions] = useState<ComboOption[]>([]);
  const [loadingRotas, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await RotaVinculadaService.buscarCombo();

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

  return { optionsRotas, loadingRotas: loadingRotas };
}
