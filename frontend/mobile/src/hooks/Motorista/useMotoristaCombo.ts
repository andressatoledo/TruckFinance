import { useEffect, useState } from 'react';
import { MotoristaService } from '../../../shared/services/motoristaService';

interface ComboOption {
  label: string;
  value: string;
}

export function useMotoristaCombo() {
  const [optionsMotoristas, setOptions] = useState<ComboOption[]>([]);
  const [loadingMotoristas, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await MotoristaService.buscarCombo();

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

  return { optionsMotoristas, loadingMotoristas: loadingMotoristas };
}
