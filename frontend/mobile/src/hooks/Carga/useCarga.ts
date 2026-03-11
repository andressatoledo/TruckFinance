import { useState, useCallback } from 'react';
import { CargaService } from '../../../shared/services/cargaService';
import  type FiltroCarga  from '../../../shared/types/Carga/cargaFiltro';
import  {Carga} from '../../../shared/types/Carga/carga';

export function useCarteira() {
  const [dados, setDados] = useState<Carga[]>([]);
  const [loading, setLoading] = useState(false);


  const buscarCarteira = useCallback(
  async (filtros?: FiltroCarga) => {
    console.log('filtros',filtros)
    setLoading(true);
    try {
      const response = await CargaService.buscarTodas(filtros);
      setDados(response);
    } finally {
      setLoading(false);
    }
  },
  []
);

   const deleteCarga = useCallback(
  async (cargaId: string) => {
    setLoading(true);
    try {
      await CargaService.excluir(cargaId);
      setDados((prev) => prev.filter((a) => a._id !== cargaId));
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
    deleteCarga
  };
}
