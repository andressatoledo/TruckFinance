import { useState, useCallback } from 'react';
import { ManutencaoService } from '../../../shared/services/manutencaoService';
import  type FiltroManutencao  from '../../../shared/types/Manutencao/ManutencaoFiltro';
import  {Manutencao} from '../../../shared/types/Manutencao/Manutencao';

export function useCarteira() {
  const [dados, setDados] = useState<Manutencao[]>([]);
  const [loading, setLoading] = useState(false);


  const buscarCarteira = useCallback(
  async (filtros?: FiltroManutencao) => {
    setLoading(true);
    try {
      const response = await ManutencaoService.buscarTodas(filtros);
      setDados(response);
    } finally {
      setLoading(false);
    }
  },
  []
);

   const deleteManutencao = useCallback(
  async (ManutencaoId: string) => {
    setLoading(true);
    try {
      await ManutencaoService.excluir(ManutencaoId);
      setDados((prev) => prev.filter((a) => a._id !== ManutencaoId));
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
    deleteManutencao
  };
}
