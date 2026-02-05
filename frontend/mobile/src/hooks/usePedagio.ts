import { useState, useCallback } from 'react';
import { PedagioService } from '../../shared/services/pedagioService';
import  PedagioFiltro from '../../shared/types/pedagioFiltro';
import  {Pedagio} from '../../shared/types/pedagio';

export function useCarteira() {
  const [dados, setDados] = useState<Pedagio[]>([]);
  const [loading, setLoading] = useState(false);


  const buscarCarteira = useCallback(
  async (filtros?: PedagioFiltro) => {
    setLoading(true);

    try {
      const response = await PedagioService.buscarTodas(filtros);
      setDados(response);
    } finally {
      setLoading(false);
    }
  },
  []
);


  return {
    dados,
    loading,
    buscarCarteira,
  };
}
