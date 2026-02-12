import { useState, useCallback } from 'react';
import { AbastecimentoService } from '../../shared/services/abastecimentoService';
import  type FiltroAbastecimento  from '../../shared/types/abastecimentoFiltro';
import  {Abastecimento} from '../../shared/types/abastecimento';

export function useCarteira() {
  const [dados, setDados] = useState<Abastecimento[]>([]);
  const [loading, setLoading] = useState(false);


  const buscarCarteira = useCallback(
  async (filtros?: FiltroAbastecimento) => {
    setLoading(true);

    try {
      console.log('filtros do abastecimento',filtros)
      const response = await AbastecimentoService.buscarTodas(filtros);
      setDados(response);
    } finally {
      setLoading(false);
    }
  },
  []
);

   const deleteAbastecimento = useCallback(
  async (abastecimentoId: string) => {
    setLoading(true);
    try {
      await AbastecimentoService.excluir(abastecimentoId);
      setDados((prev) => prev.filter((a) => a._id !== abastecimentoId));
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
    deleteAbastecimento
  };
}
