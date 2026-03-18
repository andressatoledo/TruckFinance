import { useState, useCallback } from 'react';
import { EmpregadoraService } from '../../../shared/services/empregadoraService';
import  type FiltroEmpregadora  from '../../../shared/types/Empregadora/EmpregadoraFiltro';
import  {Empregadora} from '../../../shared/types/Empregadora/Empregadora';

export function useCarteira() {
  const [dados, setDados] = useState<Empregadora[]>([]);
  const [loading, setLoading] = useState(false);


  const buscarCarteira = useCallback(
  async (filtros?: FiltroEmpregadora) => {
    setLoading(true);
    try {
      const response = await EmpregadoraService.buscarTodas(filtros);
      setDados(response);
    } finally {
      setLoading(false);
    }
  },
  []
);

   const deleteEmpregadora = useCallback(
  async (EmpregadoraId: string) => {
    setLoading(true);
    try {
      await EmpregadoraService.excluir(EmpregadoraId);
      setDados((prev) => prev.filter((a) => a._id !== EmpregadoraId));
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
    deleteEmpregadora
  };
}
