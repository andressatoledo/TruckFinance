import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Viagem } from '../../shared/types/Viagem';
// import { Motorista } from '../../shared/types/Motorista';

import { ViagemService } from '../../shared/services/viagemService';
import { RotaVinculadaService } from '../../shared/services/rotaVinculadaService';
import { MotoristaService } from '../../shared/services/motoristaService';
import {
  viagemSchema,
  ViagemFormData,
} from '../../shared/schemas/viagem.schema';
import { normalizarId } from './normalizar';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

// import { useRotaVinculadaCombo } from '../../src/hooks/useRotaVinculadaCombo';
import { useMotoristaCombo } from '../../src/hooks/useMotoristaCombo';
import { useCarretaCombo } from '../../src/hooks/useCarretaCombo';
import { useCaminhaoCombo } from '../../src/hooks/useCaminhaoCombo';
import { useEmpregadoraCombo } from '../../src/hooks/useEmpregadoraCombo';
import { useRotaVinculadaCombo } from '../../src/hooks/useRotaVinculadaCombo';
import { CaminhaoService } from '../../shared/services/caminhaoService';
import { CarretaService } from '../../shared/services/carretaService';
import {Mode} from '../../shared/types/mode'

type Navigation = NativeStackNavigationProp<RootStackParamList>;

// type Mode = 'create' | 'edit' | 'view';

type ViagemIdFields =
  | 'caminhaoId'
  | 'carretaId'
  | 'empregadoraId'
  | 'motoristaId'
  | 'rotaVinculadaId';

function mapViagemToForm(viagem: Viagem): ViagemFormData {
  return {
    viagemDataInicio: viagem.viagemDataInicio
      ? new Date(viagem.viagemDataInicio)
      : new Date(),

    viagemHorarioChegada: viagem.viagemHorarioChegada ?? '',
    viagemDataFim: viagem.viagemDataFim
      ? new Date(viagem.viagemDataFim)
      : undefined,

    viagemHorarioSaida: viagem.viagemHorarioSaida ?? '',

    motoristaId: normalizarId(viagem.motoristaId),
    rotaVinculadaId: normalizarId(viagem.rotaVinculadaId),
    empregadoraId: normalizarId(viagem.empregadoraId),
    caminhaoId: normalizarId(viagem.caminhaoId),
    carretaId: normalizarId(viagem.carretaId),

    viagemEixosIda: Number(viagem.viagemEixosIda ?? 0),
    viagemEixosVolta: Number(viagem.viagemEixosVolta ?? 0),

    viagemToneladaCarregada: Number(viagem.viagemToneladaCarregada ?? 0),
    viagemValorTonelada: Number(viagem.viagemValorTonelada ?? 0),
    viagemDistancia: Number(viagem.viagemDistancia ?? 0),
    viagemOrigemEixos: viagem.viagemOrigemEixos ?? 'Default',
    viagemStatus: viagem.viagemStatus ?? 'AguardandoPagamento',

    viagemDataPagamento: viagem.viagemDataPagamento
      ? new Date(viagem.viagemDataPagamento)
      : undefined,
  };
}

function limparIdsParaEnvio(data: ViagemFormData): Partial<Viagem> {
  const payload: any = { ...data };

  const ids: ViagemIdFields[] = [
    'caminhaoId',
    'carretaId',
    'empregadoraId',
    'motoristaId',
    'rotaVinculadaId',
  ];

  ids.forEach(id => {
    if (!payload[id]) delete payload[id];
  });

  return payload;
}

export function useViagemForm(
  mode: Mode,
  viagemId?: string,
  navigation?: Navigation,
) {
  
  const isUpdate = mode === 'edit';
  const [loading, setLoading] = useState(false);
  const readOnly = mode === 'view';

  /* 🔹 FORM */
  const form = useForm<ViagemFormData>({
    resolver: zodResolver(viagemSchema),
    defaultValues: {
      viagemStatus: 'AguardandoPagamento',
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
    reset,
    formState: { errors },
  } = form;

  //Automatização para quando atualizar motorista, popular carretaId e caminhaoId

  const { optionsMotoristas, loadingMotoristas } = useMotoristaCombo();
  const { optionsCaminhoes, loadingCaminhoes } = useCaminhaoCombo();
  const { optionsCarretas, loadingCarretas } = useCarretaCombo();

  const appliedDefaultsMotorista = useRef<{
    caminhaoId?: string;
    carretaId?: string;
  }>({});

  const motoristaId = useWatch({ control, name: 'motoristaId' });
  const caminhaoId = useWatch({ control, name: 'caminhaoId' });
  const carretaId = useWatch({ control, name: 'carretaId' });

  useEffect(() => {
    if (
      isUpdate ||
      !motoristaId ||
      loadingMotoristas ||
      loadingCaminhoes ||
      loadingCarretas
    )
      return;

    const motorista = optionsMotoristas.find(m => m.value === motoristaId);

    if (!motorista) return;

    MotoristaService.buscarPorId(motorista.value).then(motoristaSelected => {
      if (!motoristaSelected) return;

      if (
        !caminhaoId &&
        motoristaSelected.caminhaoId &&
        !appliedDefaultsMotorista.current.caminhaoId
      ) {
        setValue('caminhaoId', motoristaSelected.caminhaoId);
        appliedDefaultsMotorista.current.caminhaoId =
          motoristaSelected.caminhaoId;
      }

      if (
        !carretaId &&
        motoristaSelected.carretaId &&
        !appliedDefaultsMotorista.current.carretaId
      ) {
        setValue('carretaId', motoristaSelected.carretaId);
        appliedDefaultsMotorista.current.carretaId =
          motoristaSelected.carretaId;
      }
    });
  }, [
    optionsMotoristas,
    optionsCaminhoes,
    optionsCarretas,
    motoristaId,
    caminhaoId,
    carretaId,
    setValue,
    isUpdate,
    loadingMotoristas,
    loadingCaminhoes,
    loadingCarretas,
  ]);

  // Automatização para quando atualizar rotaVinculadaId, popular empregadoraId
  const { optionsEmpregadoras, loadingEmpregadoras } = useEmpregadoraCombo();
  const { optionsRotas, loadingRotas } = useRotaVinculadaCombo(); //Popular empregadora

  const appliedDefaultsCaminhao = useRef<{ empregadoraId?: string }>({});

  const empregadoraId = useWatch({ control, name: 'empregadoraId' });

  useEffect(() => {
    if (isUpdate || !caminhaoId || loadingCaminhoes || loadingEmpregadoras)
      return;

    const caminhao = optionsCaminhoes.find(c => c.value === caminhaoId);

    if (!caminhao) return;

    CaminhaoService.buscarPorId(caminhao.value).then(caminhaoSelected => {
      if (!caminhaoSelected) return;

      if (
        !empregadoraId &&
        caminhaoSelected.empregadoraId &&
        !appliedDefaultsCaminhao.current.empregadoraId
      ) {
        setValue('empregadoraId', caminhaoSelected.empregadoraId);
        appliedDefaultsCaminhao.current.empregadoraId =
          caminhaoSelected.empregadoraId;
      }
    });
  }, [
    optionsCaminhoes,
    caminhaoId,
    optionsEmpregadoras,
    optionsRotas,
    empregadoraId,
    setValue,
    isUpdate,
    loadingEmpregadoras,
    loadingRotas,
    loadingCaminhoes,
  ]);

  const lastCarretaIdRef = useRef<string | null>(null);
  const isApplyingDefaultRef = useRef(false);
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    if (!viagemId || mode === 'create') return;

    let isMounted = true;
    setLoading(true);

    ViagemService.buscarPorId(viagemId)
      .then(viagem => {
        if (isMounted) {
          reset(mapViagemToForm(viagem));
          lastCarretaIdRef.current = normalizarId(viagem.carretaId);
          isInitialLoadRef.current = false;
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [mode, viagemId, reset]);

  //Popular valor tonelada ao selecionar rota vinculada
  const rotaVinculadaId = useWatch({ control, name: 'rotaVinculadaId' });
  const viagemValorTonelada = useWatch({
    control,
    name: 'viagemValorTonelada',
  });

  // Ref para controlar se o valor já foi setado automaticamente
  const appliedRotaDefaultRef = useRef<string | null>(null);

  // Preenche valor da rota vinculada
  useEffect(() => {
    if (!rotaVinculadaId) return;

    // Se já aplicamos o default para esta rota, não faz nada
    if (appliedRotaDefaultRef.current === rotaVinculadaId) return;

    // Só preenche se o valor atual estiver vazio ou for 0
    if (viagemValorTonelada) return;

    RotaVinculadaService.buscarPorId(rotaVinculadaId).then(rota => {
      if (!rota) return;

      setValue('viagemValorTonelada', rota.rotaVinculadaValor ?? 0, {
        shouldDirty: true,
        shouldValidate: true,
      });

      // Marca que já aplicamos o default para essa rota
      appliedRotaDefaultRef.current = rotaVinculadaId;
    });
  }, [rotaVinculadaId, setValue, viagemValorTonelada]);

  //Popular quantidade de eixos ao selecionar carreta
  const appliedCarretaDefaultRef = useRef<string | null>(null);

  useEffect(() => {
    console.log('carretaId', carretaId);
    if (!carretaId) return;

    if (lastCarretaIdRef.current === carretaId) return;
    CarretaService.buscarPorId(carretaId).then(carreta => {
      console.log('carreta', carreta);
      if (!carreta) return;

      isApplyingDefaultRef.current = true;

      setValue('viagemEixosIda', carreta.carretaEixosVazio ?? 0, {
        shouldDirty: false,
      });

      setValue('viagemEixosVolta', carreta.carretaEixosCheio ?? 0, {
        shouldDirty: false,
      });

      setValue('viagemOrigemEixos', 'Default', { shouldDirty: false });

      appliedCarretaDefaultRef.current = carretaId;

      // libera no próximo tick
      setTimeout(() => {
        isApplyingDefaultRef.current = false;
      }, 0);
    });
  }, [carretaId, setValue]);

  const viagemEixosIda = useWatch({ control, name: 'viagemEixosIda' });
  const viagemEixosVolta = useWatch({ control, name: 'viagemEixosVolta' });

  useEffect(() => {
    if (isApplyingDefaultRef.current) return;

    setValue('viagemOrigemEixos', 'Manual', {
      shouldDirty: true,
    });
  }, [viagemEixosIda, viagemEixosVolta, setValue]);

  const onSubmit: SubmitHandler<ViagemFormData> = async data => {
    const payload = limparIdsParaEnvio(data);
    console.log('payload', payload);
    if (mode === 'create') {
      await ViagemService.criar(payload);
    }

    if (mode === 'edit' && viagemId) {
      await ViagemService.atualizar(viagemId, payload);
    }

    navigation?.goBack();
  };

  return {
    control,
    errors,
    loading,
    readOnly,
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
