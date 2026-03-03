import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Abastecimento } from '../../shared/types/Abastecimento';
import {
  abastecimentoSchema,
  AbastecimentoFormData,
} from '../../shared/schemas/abastecimento.schema';

import { AbastecimentoService } from '../../shared/services/abastecimentoService';

import { Mode } from '../../shared/types/mode';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useScreenMode } from '../utils/useScreenMode';
import { useCaminhaoCombo } from '../hooks/useCaminhaoCombo';
import { convertUndefinedToNull } from '../../shared/utils/convertUndefinedToNull';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

function mapAbastecimentoToForm(abastecimento: Abastecimento): AbastecimentoFormData {
  return {
     abastecimentoData: abastecimento.abastecimentoData
      ? new Date(abastecimento.abastecimentoData)
      : new Date(),
    abastecimentoKm: abastecimento.abastecimentoKm ?? 0,
    abastecimentoLitros: abastecimento.abastecimentoLitros ?? '',
    abastecimentoObservacao: abastecimento.abastecimentoObservacao ?? '',
    abastecimentoPrazoPagamento: abastecimento.abastecimentoPrazoPagamento ?? undefined,
    abastecimentoTipoPagamento: abastecimento.abastecimentoTipoPagamento ?? undefined,
    abastecimentoValor: abastecimento.abastecimentoValor ?? '',
    caminhaoId: abastecimento.caminhaoId ?? '',
  };
}

export function useAbastecimentoForm(
  mode: Mode,
  abastecimentoId?: string,
  navigation?: Navigation,
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;
  const { optionsCaminhoes, loadingCaminhoes } = useCaminhaoCombo();

  const form = useForm<AbastecimentoFormData>({
    resolver: zodResolver(abastecimentoSchema),
    defaultValues: {
       abastecimentoKm: 0,
      abastecimentoLitros: 0,
      abastecimentoValor: 0,
      caminhaoId: '',
      abastecimentoTipoPagamento: undefined,
      abastecimentoPrazoPagamento: undefined,
      abastecimentoObservacao: '',
      abastecimentoData: new Date(),
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
  
  const saveAll = async (data: AbastecimentoFormData) => {
    setLoading(true);
    try {
      const dataTratada = convertUndefinedToNull(data);
      if (isCreate) {
       await AbastecimentoService.criar(dataTratada);
       

      } else if (abastecimentoId) {
        await AbastecimentoService.atualizar(abastecimentoId, dataTratada);
      }

      navigation?.goBack();
    } catch (error) {
      console.error("Erro no salvamento unificado:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!abastecimentoId || isCreate) return;

  let isMounted = true;

 setLoading(true);
  
  AbastecimentoService.buscarPorId(abastecimentoId)
    .then(abastecimento => {
      if (!isMounted) return;
      reset(mapAbastecimentoToForm(abastecimento));
    })
    .finally(() => {
      if (isMounted) setLoading(false);
    });

  return () => {
    isMounted = false;
  };
}, [abastecimentoId, isCreate, reset, setLoading]);


  return {
    control,
    errors,
    loading: screen.loading,
    screen,
    optionsCaminhoes,
    loadingCaminhoes,
    handleSubmit,
    saveAll,
    setValue,
  };
}
