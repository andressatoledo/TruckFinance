import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Pedagio } from '../../../shared/types/Pedagio/pedagio';
import {
  pedagioSchema,
  PedagioFormData,
} from '../../../shared/schemas/pedagio.schema';

import { PedagioService } from '../../../shared/services/pedagioService';

import { Mode } from '../../../shared/types/Outros/mode';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

import { useScreenMode } from '../../utils/useScreenMode';

import {PedagioValorService} from '../../../shared/services/pedagioValorService'
import {PedagioValor} from '../../../shared/types/Pedagio/pedagioValor'
type Navigation = NativeStackNavigationProp<RootStackParamList>;

function mapPedagioToForm(pedagio: Pedagio): PedagioFormData {
  return {
    pedagioNome: pedagio.pedagioNome ?? '',
    pedagioLocalizacao: pedagio.pedagioLocalizacao ?? '',
    pedagioRodovia: pedagio.pedagioRodovia ?? '',
  };
}

export function usePedagioForm(
  mode: Mode,
  pedagioId?: string,
  navigation?: Navigation,
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const form = useForm<PedagioFormData>({
    resolver: zodResolver(pedagioSchema),
    defaultValues: {
      pedagioNome: '',
      pedagioLocalizacao: '',
      pedagioRodovia: '',
    },
    shouldUnregister: false,
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = form;
  
  const saveAll = async (data: PedagioFormData, valoresGrid: PedagioValor[]) => {
    setLoading(true);
    try {
      let currentId = pedagioId;
      
      if (valoresGrid.length <= 0) {
        console.error("É necessário inserir ao menos um valor de pedágio.");
        return
      }

      if (isCreate) {
        
        const novo = await PedagioService.criar(data);
        currentId = novo._id; 

      } else if (pedagioId) {
        await PedagioService.atualizar(pedagioId, data);
      }

      if (currentId) {
        await PedagioValorService.criarValores(currentId,valoresGrid);
      }

      navigation?.goBack();
    } catch (error) {
      console.error("Erro no salvamento unificado:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!pedagioId || isCreate) return;

  let isMounted = true;

 setLoading(true);
  
  PedagioService.buscarPorId(pedagioId)
    .then(pedagio => {
      if (!isMounted) return;
      reset(mapPedagioToForm(pedagio));
    })
    .finally(() => {
      if (isMounted) setLoading(false);
    });

  return () => {
    isMounted = false;
  };
}, [pedagioId, isCreate, reset, setLoading]);


  return {
    control,
    errors,
    loading: screen.loading,
    screen,
    handleSubmit,
    saveAll,
    setValue,
  };
}
