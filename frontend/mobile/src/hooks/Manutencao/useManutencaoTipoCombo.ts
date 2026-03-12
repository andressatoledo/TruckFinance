import { useEffect, useState } from 'react';
import { ComboOption } from '../../../shared/types/Outros/ComboOption';
import { ManutencaoTipoOptions } from '../../../shared/types/Manutencao/manutencaoTipo';


export function useManutencaoTipoCombo() {
  const [optionsManutencaoTipos, setOptions] = useState<ComboOption[]>([]);
  const [loadingManutencaoTipos, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const mapped = Object.entries(ManutencaoTipoOptions).map(([key,value]) => ({
          value: ManutencaoTipoOptions[Number(key)].toString(),
          label: value,
        }));
    
        setOptions(mapped);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { optionsManutencaoTipos, loadingManutencaoTipos };
}