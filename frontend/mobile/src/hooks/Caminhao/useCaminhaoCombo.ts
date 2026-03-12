import { useEffect, useState } from 'react';
import { CaminhaoService } from '../../../shared/services/caminhaoService';

interface ComboOption {
  label: string;
  value: string;
}

export function useCaminhaoCombo() {
  const [optionsCaminhoes, setOptions] = useState<ComboOption[]>([]);
  const [loadingCaminhoes, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await CaminhaoService.buscarCombo();

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

  return { optionsCaminhoes, loadingCaminhoes: loadingCaminhoes };
}
