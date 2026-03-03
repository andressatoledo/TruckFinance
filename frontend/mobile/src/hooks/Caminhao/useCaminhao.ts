import { useState, useCallback } from 'react';
import { CaminhaoService } from '../../../shared/services/caminhaoService';
import  type FiltroCaminhao  from '../../../shared/types/Caminhao/caminhaoFiltro';
import  {Caminhao} from '../../../shared/types/Caminhao/caminhao';

export function useCarteira() {
  const [dados, setDados] = useState<Caminhao[]>([]);
  const [loading, setLoading] = useState(false);


  const buscarCarteira = useCallback(
  async (filtros?: FiltroCaminhao) => {
    setLoading(true);
    try {
      const response = await CaminhaoService.buscarTodas(filtros);
      setDados(response);
    } finally {
      setLoading(false);
    }
  },
  []
);

   const deleteCaminhao = useCallback(
  async (caminhaoId: string) => {
    setLoading(true);
    try {
      await CaminhaoService.excluir(caminhaoId);
      setDados((prev) => prev.filter((a) => a._id !== caminhaoId));
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
    deleteCaminhao
  };
}
