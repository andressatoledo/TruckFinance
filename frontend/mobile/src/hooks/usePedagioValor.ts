import { useState, useEffect } from 'react';
import { PedagioValor } from '../../shared/types/PedagioValor';
// import { PedagioValorFiltro } from '../../shared/types/PedagioValorFiltro';
import { PedagioValorService } from '../../shared/services/pedagioValorService';
import { useScreenMode } from '../utils/useScreenMode';
import { Mode } from '../../shared/types/mode';
import { ObjectId } from 'bson';
//Validações
import { ZodIssue } from 'zod';
import {pedagioValorSchema} from '../../shared/schemas/pedagioValor.schema'

type GridErrors = {
  [index: number]: {
    pedagioValorNumeroEixos?: string;
    pedagioValorPedagio?: string;
  };
};


export function usePedagioValores(mode: Mode, pedagioId?: string) {
  const { isCreate } = useScreenMode(mode);
  const [errors, setErrors] = useState<GridErrors>({});
  const [valores, setValores] = useState<PedagioValor[]>([]);

useEffect(() => {
  if (!isCreate && pedagioId) {
    PedagioValorService.buscarPorPedagioId(pedagioId).then(res => {
      if (Array.isArray(res)) {
        setValores(res);
      }  else {
        setValores([]);
      }}
    );
  }
}, [pedagioId, isCreate]);


  const validarGrid = (): boolean => {
    const result = pedagioValorSchema.safeParse(valores);

    if (result.success) {
      setErrors({});
      return true;
    }

    const gridErrors: GridErrors = {};

    result.error.errors.forEach((err: ZodIssue) => {
      
      const index = err.path[0] as number;
      const field = err.path[1] as keyof PedagioValor;

      gridErrors[index] = {
        ...gridErrors[index],
        [field]: err.message,
      };
    });

    setErrors(gridErrors);
    return false;
  };

  const adicionarLinhaVazia = () => {
    setValores([
      ...valores,
      {_id: new ObjectId().toString(), pedagioValorPedagio: 0, pedagioValorNumeroEixos: 0 },
    ]);
  };

  const salvarLinha = (item: PedagioValor, index: number) => {
    const novosValores = [...valores];
    novosValores[index] = item;
    setValores(novosValores);
  };

  const removerLinha = (index: number) => {
    console.log('index',index)
    setValores(valores.filter((_, i) => i !== index));
    console.log('depois de deletado',valores)
  };

  return {
    valores,
    errors,
    validarGrid,
    adicionarLinhaVazia,
    salvarLinha,
    removerLinha,
  };
}
