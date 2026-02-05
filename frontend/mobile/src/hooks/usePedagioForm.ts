import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Pedagio } from '../../shared/types/Pedagio';
import {
  pedagioSchema,
  PedagioFormData,
} from '../../shared/schemas/pedagio.schema';

import { PedagioService } from '../../shared/services/pedagioService';
import { Mode } from '../../shared/types/mode';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

import { useScreenMode } from '../utils/useScreenMode';

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

  /**
   * 🔹 Carregar dados no modo edit/view
   */
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


  /**
   * 🔹 Submit do formulário
   */
  const onSubmit: SubmitHandler<PedagioFormData> = async data => {
  setLoading(true);
  try {
    if (isCreate) {
      await PedagioService.criar(data);
    }

    if (!isCreate && pedagioId) {
      await PedagioService.atualizar(pedagioId, data);
    }

    navigation?.goBack();
  } finally {
    setLoading(false);
  }
};


  return {
    control,
    errors,
    loading: screen.loading,
    screen,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
  };
}
