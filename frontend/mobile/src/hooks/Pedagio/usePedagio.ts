import { useState, useCallback } from 'react';
import { PedagioService } from '../../../shared/services/pedagioService';
import  PedagioFiltro from '../../../shared/types/pedagioFiltro';
import  {Pedagio} from '../../../shared/types/pedagio';

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

   const deletePedagio = useCallback(
  async (pedagioId: string) => {
    setLoading(true);
    try {
      await PedagioService.excluir(pedagioId);
      setDados((prev) => prev.filter((p) => p._id !== pedagioId));
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
    deletePedagio
  };
}
