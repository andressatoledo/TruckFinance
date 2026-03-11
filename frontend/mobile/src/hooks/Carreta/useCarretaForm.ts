import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  carretaSchema,
  CarretaFormData,
} from '../../../shared/schemas/carreta.schema';

import { CarretaService } from '../../../shared/services/carretaService';

import { Mode } from '../../../shared/types/mode';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useScreenMode } from '../../utils/useScreenMode';
import { convertUndefinedToNull } from '../../../shared/utils/convertUndefinedToNull';
import {mapCarretaToForm} from '../../../shared/mappers/carretaMapper';

type Navigation = NativeStackNavigationProp<RootStackParamList>;


export function useCarretaForm(
  mode: Mode,
  carretaId?: string,
  navigation?: Navigation,
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const form = useForm<CarretaFormData>({
    resolver: zodResolver(carretaSchema),
    defaultValues: {
      carretaPlaca: '',
      // carretaTipo: '',
      carretaStatus: 'Ativo',
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
  
  const saveAll = async (data: CarretaFormData) => {
    setLoading(true);
    try {
      const dataTratada = convertUndefinedToNull(data);
      if (isCreate) {
       await CarretaService.criar(dataTratada);
       

      } else if (carretaId) {
        await CarretaService.atualizar(carretaId, dataTratada);
      }

      navigation?.goBack();
    } catch (error) {
      console.error("Erro no salvamento unificado:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!carretaId || isCreate) return;

  let isMounted = true;

 setLoading(true);
  
  CarretaService.buscarPorId(carretaId)
    .then(carreta => {
      if (!isMounted) return;
      reset(mapCarretaToForm(carreta));
    })
    .finally(() => {
      if (isMounted) setLoading(false);
    });

  return () => {
    isMounted = false;
  };
}, [carretaId, isCreate, reset, setLoading]);


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
