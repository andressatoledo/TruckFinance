import { useEffect, useState } from 'react';
import { ComboOption } from '../../../shared/types/Outros/ComboOption';
import { ManutencaoCategoriaOptions } from '../../../shared/types/Manutencao/manutencaoCategoria';


export function useManutencaoCategoriaCombo() {
  const [optionsManutencaoCategorias, setOptions] = useState<ComboOption[]>([]);
  const [loadingManutencaoCategorias, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const mapped = Object.entries(ManutencaoCategoriaOptions).map(([key,value]) => ({
          value: ManutencaoCategoriaOptions[Number(key)].toString(),
          label: value,
        }));
    
        setOptions(mapped);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { optionsManutencaoCategorias, loadingManutencaoCategorias };
}