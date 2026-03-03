import { useState, useEffect } from 'react';
import { PedagioValor } from '../../shared/types/PedagioValor';
import { PedagioValorService } from '../../shared/services/pedagioValorService';
import { useScreenMode } from '../utils/useScreenMode';
import { Mode } from '../../shared/types/mode';
import { ObjectId } from 'bson';
import { pedagioValorSchema } from '../../shared/schemas/pedagioValor.schema';

type GridErrors = {
  [index: number]: {
    pedagioValorNumeroEixos?: string;
    pedagioValorPedagio?: string;
  };
};

export function usePedagioValores(mode: Mode, pedagioId?: string) {
  const { isCreate } = useScreenMode(mode);

  const [errorsPedagioValores, setErrors] = useState<GridErrors>({});
  const [valores, setValores] = useState<PedagioValor[]>([]);
  const [autoEditIndex, setAutoEditIndex] = useState<number | null>(null);
  const [gridIsEditing, setGridIsEditing] = useState(false);

  useEffect(() => {
    if (!isCreate && pedagioId) {
      PedagioValorService.buscarPorPedagioId(pedagioId).then(res => {
        if (Array.isArray(res)) {
          setValores(res);
        } else {
          setValores([]);
        }
      });
    }
  }, [pedagioId, isCreate]);

  const validarGrid = (item: PedagioValor, index: number): boolean => {
    const result = pedagioValorSchema.safeParse(item);

    if (result.success) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
      return true;
    }

    const fieldErrors: any = {};

    result.error.errors.forEach(err => {
      const field = err.path[0] as keyof PedagioValor;
      fieldErrors[field] = err.message;
    });

    setErrors(prev => ({
      ...prev,
      [index]: fieldErrors,
    }));

    return false;
  };

  const adicionarLinhaVazia = () => {
  setValores(prev => {
    const novoArray = [
      ...prev,
      {
        _id: new ObjectId().toString(),
        pedagioValorNumeroEixos: '' as any,
        pedagioValorPedagio: '' as any,
        isNew: true,
      },
    ];

    setAutoEditIndex(novoArray.length - 1);
    return novoArray;
  });
};

  const salvarLinha = (item: PedagioValor, index: number): boolean => {
    const valido = validarGrid(item, index);

    if (!valido) return false;

    const numeroEixosString = String(item.pedagioValorNumeroEixos).replace(
      ',',
      '.',
    );
    const valorPedagioString = String(item.pedagioValorPedagio).replace(
      ',',
      '.',
    );

    const numeroEixos = Number(numeroEixosString);
    const valorPedagio = Number(valorPedagioString);

    if (isNaN(numeroEixos) || isNaN(valorPedagio)) {
      return false;
    }

    const novosValores = [...valores];

    novosValores[index] = {
      ...item,
      pedagioValorNumeroEixos: numeroEixos,
      pedagioValorPedagio: valorPedagio,
    };

    setValores(novosValores);
    setAutoEditIndex(null);

    return true;
  };

  const removerLinha = (id: string) => {
    setValores(prev => {
      const novoArray = prev.filter(item => item._id !== id);
      return novoArray;
    });

    setErrors({});
    setAutoEditIndex(null);
  };

  return {
    valores,
    errorsPedagioValores,
    adicionarLinhaVazia,
    salvarLinha,
    removerLinha,
    autoEditIndex,
    gridIsEditing,
    setGridIsEditing,
  };
}
