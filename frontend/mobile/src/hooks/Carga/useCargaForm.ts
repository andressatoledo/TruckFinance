import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  cargaSchema,
  CargaFormData,
} from '../../../shared/schemas/carga.schema';

import { CargaService } from '../../../shared/services/cargaService';

import { Mode } from '../../../shared/types/Outros/mode';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useScreenMode } from '../../utils/useScreenMode';
import { convertUndefinedToNull } from '../../../shared/utils/convertUndefinedToNull';
import {mapCargaToForm} from '../../../shared/mappers/cargaMapper';

type Navigation = NativeStackNavigationProp<RootStackParamList>;


export function useCargaForm(
  mode: Mode,
  cargaId?: string,
  navigation?: Navigation,
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const form = useForm<CargaFormData>({
    resolver: zodResolver(cargaSchema),
    defaultValues: {
      cargaTipo: '',
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
  
  const saveAll = async (data: CargaFormData) => {
    setLoading(true);
    try {
      const dataTratada = convertUndefinedToNull(data);
      if (isCreate) {
       await CargaService.criar(dataTratada);
       

      } else if (cargaId) {
        await CargaService.atualizar(cargaId, dataTratada);
      }

      navigation?.goBack();
    } catch (error) {
      console.error("Erro no salvamento unificado:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!cargaId || isCreate) return;

  let isMounted = true;

 setLoading(true);
  
  CargaService.buscarPorId(cargaId)
    .then(carga => {
      if (!isMounted) return;
      reset(mapCargaToForm(carga));
    })
    .finally(() => {
      if (isMounted) setLoading(false);
    });

  return () => {
    isMounted = false;
  };
}, [cargaId, isCreate, reset, setLoading]);


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
