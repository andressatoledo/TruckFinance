import { useState, useCallback } from 'react';
import { CarretaService } from '../../../shared/services/carretaService';
import  type FiltroCarreta  from '../../../shared/types/Carreta/CarretaFiltro';
import  {Carreta} from '../../../shared/types/Carreta/Carreta';

export function useCarteira() {
  const [dados, setDados] = useState<Carreta[]>([]);
  const [loading, setLoading] = useState(false);


  const buscarCarteira = useCallback(
  async (filtros?: FiltroCarreta) => {
    setLoading(true);
    try {
      const response = await CarretaService.buscarTodas(filtros);
      setDados(response);
    } finally {
      setLoading(false);
    }
  },
  []
);

   const deleteCarreta = useCallback(
  async (CarretaId: string) => {
    setLoading(true);
    try {
      await CarretaService.excluir(CarretaId);
      setDados((prev) => prev.filter((a) => a._id !== CarretaId));
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
    deleteCarreta
  };
}
