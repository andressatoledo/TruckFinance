import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  empregadoraSchema,
  EmpregadoraFormData,
} from '../../../shared/schemas/empregadora.schema';

import { EmpregadoraService } from '../../../shared/services/empregadoraService';

import { Mode } from '../../../shared/types/Outros/mode';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useScreenMode } from '../../utils/useScreenMode';
import { convertUndefinedToNull } from '../../../shared/utils/convertUndefinedToNull';
import {mapEmpregadoraToForm} from '../../../shared/mappers/empregadoraMapper';

type Navigation = NativeStackNavigationProp<RootStackParamList>;


export function useEmpregadoraForm(
  mode: Mode,
  empregadoraId?: string,
  navigation?: Navigation,
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const form = useForm<EmpregadoraFormData>({
    resolver: zodResolver(empregadoraSchema),
    defaultValues: {
      empregadoraNome: '',
      empregadoraStatus: 'Ativo',
      empregadoraPrazoPagamento: '15 dias'
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
  
  const saveAll = async (data: EmpregadoraFormData) => {
    setLoading(true);
    try {
      const dataTratada = convertUndefinedToNull(data);
      if (isCreate) {
       await EmpregadoraService.criar(dataTratada);
       

      } else if (empregadoraId) {
        await EmpregadoraService.atualizar(empregadoraId, dataTratada);
      }

      navigation?.goBack();
    } catch (error) {
      console.error("Erro no salvamento unificado:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!empregadoraId || isCreate) return;

  let isMounted = true;

 setLoading(true);
  
  EmpregadoraService.buscarPorId(empregadoraId)
    .then(empregadora => {
      if (!isMounted) return;
      reset(mapEmpregadoraToForm(empregadora));
    })
    .finally(() => {
      if (isMounted) setLoading(false);
    });

  return () => {
    isMounted = false;
  };
}, [empregadoraId, isCreate, reset, setLoading]);


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
