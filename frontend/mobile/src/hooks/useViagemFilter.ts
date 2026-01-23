import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ViagemService } from '../../shared/services/viagemService';
// import { RotaVinculadaService } from '../../shared/services/rotaVinculadaService';
// import { MotoristaService } from '../../shared/services/motoristaService';
import { viagemSchema, ViagemFormData } from '../../shared/schemas/viagem.schema';
import { normalizarId } from './normalizar';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

// import { useRotaVinculadaCombo } from '../../src/hooks/useRotaVinculadaCombo';
import { useMotoristaCombo } from './useMotoristaCombo';
import { useCarretaCombo } from './useCarretaCombo';
import { useCaminhaoCombo } from './useCaminhaoCombo';
import { useEmpregadoraCombo } from './useEmpregadoraCombo';
import { useRotaVinculadaCombo } from './useRotaVinculadaCombo';
import ViagemFiltro  from '../../shared/types/viagemFiltro';


type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function useViagemFilter(navigation?: Navigation) {

  const [loading, setLoading] = useState(false);


  const form = useForm<ViagemFormData>({
    resolver: zodResolver(viagemSchema),
    defaultValues: {
      // viagemStatus: '',
      viagemToneladaCarregada: 0,
      viagemValorTonelada: 0,
      rotaVinculadaId: '',
      motoristaId: '',
      empregadoraId: '',
      caminhaoId: '',
      carretaId: '',
      viagemDistancia: 0,
      viagemDataInicio: new Date(),
    },
    shouldUnregister: false,
  });

  const {
    control,
    handleSubmit,
    setValue,
    // reset,
    formState: { errors },
  } = form;


  //Automatização para quando atualizar motorista, popular carretaId e caminhaoId

  const { optionsMotoristas, loadingMotoristas } = useMotoristaCombo();
  const { optionsCaminhoes, loadingCaminhoes } = useCaminhaoCombo();
  const { optionsCarretas, loadingCarretas } = useCarretaCombo();
  const { optionsEmpregadoras, loadingEmpregadoras } = useEmpregadoraCombo();
  const { optionsRotas, loadingRotas } = useRotaVinculadaCombo(); 

 
   useEffect(() => {
     

  }, [
    optionsMotoristas,
    optionsCaminhoes,
    optionsCarretas,
    optionsEmpregadoras,
    optionsRotas,
    loadingEmpregadoras,
    loadingRotas,
    loadingCaminhoes,
    loadingMotoristas,
    loadingCarretas,
  ]);


  const onSubmit: SubmitHandler<ViagemFormData> = async (data) => {

    const filtro: ViagemFiltro = {};
    filtro.caminhaoId = normalizarId(data.caminhaoId);
    filtro.carretaId = normalizarId(data.carretaId);
    filtro.empregadoraId = normalizarId(data.empregadoraId);
    filtro.motoristaId = normalizarId(data.motoristaId);
    filtro.rotaVinculadaId = normalizarId(data.rotaVinculadaId);
    filtro.status = data.viagemStatus;

    console.log(filtro);

    setLoading(true);
    const viagens = await ViagemService.buscarTodas(filtro);
    console.log('Viagens encontradas',viagens);
  
 

  navigation?.goBack();
};


  return {
    control,
    errors,
    loading,
    // readOnly,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    loadingMotoristas,
    loadingCaminhoes,
    loadingCarretas,
    loadingRotas,
    loadingEmpregadoras,
    optionsMotoristas,
    optionsCaminhoes,
    optionsCarretas,
    optionsRotas,
    optionsEmpregadoras,
  };
}
