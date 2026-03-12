import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  caminhaoSchema,
  CaminhaoFormData,
} from '../../../shared/schemas/caminhao.schema';

import { CaminhaoService } from '../../../shared/services/caminhaoService';

import { Mode } from '../../../shared/types/Outros/mode';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useScreenMode } from '../../utils/useScreenMode';
import { useEmpregadoraCombo } from '../Empregadora/useEmpregadoraCombo';
import { convertUndefinedToNull } from '../../../shared/utils/convertUndefinedToNull';
import {mapCaminhaoToForm} from '../../../shared/mappers/caminhaoMapper';

type Navigation = NativeStackNavigationProp<RootStackParamList>;


export function useCaminhaoForm(
  mode: Mode,
  caminhaoId?: string,
  navigation?: Navigation,
) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;
  const { optionsEmpregadoras, loadingEmpregadoras } = useEmpregadoraCombo();

  const form = useForm<CaminhaoFormData>({
    resolver: zodResolver(caminhaoSchema),
    defaultValues: {
        empregadoraId: '',
      caminhaoPlaca: '',
      caminhaoStatus: 'Ativo',
      caminhaoNome:'',
      caminhaoTrocaDeOleo: null,
      caminhaoUltimaManutencao: null,
   caminhaoDocumentos: {
      ipva: {
        dataExpiracao: null,
        status: null,
      },
      seguro: {
        dataExpiracao: null,
        status: null,
      },
      crlv: {
        dataExpiracao: null,
        status: null,
      },
    },


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
  
  const saveAll = async (data: CaminhaoFormData) => {
    setLoading(true);
    try {
      console.log(
  "DATA IPVA:",
  data.caminhaoDocumentos?.ipva?.dataExpiracao,
  typeof data.caminhaoDocumentos?.ipva?.dataExpiracao
);
      const dataTratada = convertUndefinedToNull(data);
      console.log("DATA ENVIADA PARA API:", JSON.stringify(dataTratada, null, 2));
      if (isCreate) {
       await CaminhaoService.criar(dataTratada);
       

      } else if (caminhaoId) {
        await CaminhaoService.atualizar(caminhaoId, dataTratada);
      }

      navigation?.goBack();
    } catch (error) {
      console.error("Erro no salvamento unificado:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!caminhaoId || isCreate) return;

  let isMounted = true;

 setLoading(true);
  
  CaminhaoService.buscarPorId(caminhaoId)
    .then(caminhao => {
      if (!isMounted) return;
      reset(mapCaminhaoToForm(caminhao));
    })
    .finally(() => {
      if (isMounted) setLoading(false);
    });

  return () => {
    isMounted = false;
  };
}, [caminhaoId, isCreate, reset, setLoading]);


  return {
    control,
    errors,
    loading: screen.loading,
    screen,
    optionsEmpregadoras,
    loadingEmpregadoras,
    handleSubmit,
    saveAll,
    setValue,
  };
}
