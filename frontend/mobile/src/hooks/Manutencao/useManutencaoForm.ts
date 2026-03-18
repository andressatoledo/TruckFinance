import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  manutencaoSchema,
  ManutencaoFormData,
} from '../../../shared/schemas/manutencao.schema';

import { ManutencaoService } from '../../../shared/services/manutencaoService';

import { Mode } from '../../../shared/types/Outros/mode';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useScreenMode } from '../../utils/useScreenMode';
import { convertUndefinedToNull } from '../../../shared/utils/convertUndefinedToNull';
import {mapManutencaoToForm} from '../../../shared/mappers/manutencaoMapper';

import { useCarretaCombo } from '../Carreta/useCarretaCombo';
import { useCaminhaoCombo } from '../Caminhao/useCaminhaoCombo';


type Navigation = NativeStackNavigationProp<RootStackParamList>;


export function useManutencaoForm(
  mode: Mode,
  manutencaoId?: string,
  navigation?: Navigation,
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;
  const { optionsCaminhoes, loadingCaminhoes } = useCaminhaoCombo();
  const { optionsCarretas, loadingCarretas } = useCarretaCombo();

  const form = useForm<ManutencaoFormData>({
    resolver: zodResolver(manutencaoSchema),
    defaultValues: {
      manutencaoDescricao: '',
      // manutencaoValor: 0,
      caminhaoId: '',
      carretaId: '',
      manutencaoLocal: '',
      manutencaoObservacao: '',
      manutencaoData: null,
      manutencaoProximaData: null,
      // manutencaoProximoKm: 0,
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
  
  const saveAll = async (data: ManutencaoFormData) => {
    setLoading(true);
    try {
      const dataTratada = convertUndefinedToNull(data);
      if (isCreate) {
       await ManutencaoService.criar(dataTratada);
       

      } else if (manutencaoId) {
        await ManutencaoService.atualizar(manutencaoId, dataTratada);
      }

      navigation?.goBack();
    } catch (error) {
      console.error("Erro no salvamento unificado:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!manutencaoId || isCreate) return;

  let isMounted = true;

 setLoading(true);
  
  ManutencaoService.buscarPorId(manutencaoId)
    .then(manutencao => {
      if (!isMounted) return;
      reset(mapManutencaoToForm(manutencao));
    })
    .finally(() => {
      if (isMounted) setLoading(false);
    });

  return () => {
    isMounted = false;
  };
}, [manutencaoId, isCreate, reset, setLoading]);


  return {
    control,
    errors,
    loading: screen.loading,
    screen,
     loadingCaminhoes,
    loadingCarretas,
     optionsCaminhoes,
    optionsCarretas,
    handleSubmit,
    saveAll,
    setValue,
  };
}
