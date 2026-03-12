import { useEffect, useState } from 'react';
import { CarretaTipos } from '../../../shared/types/Carreta/carretaTipo';

interface ComboOption {
  label: string;
  value: string;
}

export function useCarretaTipoCombo() {
  const [optionsCarretaTipos, setOptions] = useState<ComboOption[]>([]);
  const [loadingCarretaTipos, setLoading] = useState(true);

  console.log('CarretaTipos', CarretaTipos);
  useEffect(() => {
    async function load() {
      try {
        const mapped = Object.entries(CarretaTipos).map(([key,value]) => ({
          value: CarretaTipos[Number(key)].toString(),
          label: value,
        }));
        console.log('Mapped CarretaTipos', mapped);
        setOptions(mapped);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { optionsCarretaTipos, loadingCarretaTipos };
}