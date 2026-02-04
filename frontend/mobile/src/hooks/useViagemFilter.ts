import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { normalizarId } from './normalizar';

import { useMotoristaCombo } from './useMotoristaCombo';
import { useCarretaCombo } from './useCarretaCombo';
import { useCaminhaoCombo } from './useCaminhaoCombo';
import { useEmpregadoraCombo } from './useEmpregadoraCombo';
import { useRotaVinculadaCombo } from './useRotaVinculadaCombo';

import ViagemFiltro from '../../shared/types/viagemFiltro';
import {
  viagemFiltroSchema,
  ViagemFiltroData,
} from '../../shared/schemas/viagemFiltro.schema';

interface UseViagemFilterProps {
  onApplyFiltro: (filtro: ViagemFiltro) => void;
  filtroAtual: ViagemFiltro;
}

export function useViagemFilter({ onApplyFiltro, filtroAtual }: UseViagemFilterProps) {
  const [loading, setLoading] = useState(false);
 
  const form = useForm<ViagemFiltroData>({
    resolver: zodResolver(viagemFiltroSchema),
    defaultValues: filtroAtual,
    shouldUnregister: false,
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const { optionsMotoristas, loadingMotoristas } = useMotoristaCombo();
  const { optionsCaminhoes, loadingCaminhoes } = useCaminhaoCombo();
  const { optionsCarretas, loadingCarretas } = useCarretaCombo();
  const { optionsEmpregadoras, loadingEmpregadoras } = useEmpregadoraCombo();
  const { optionsRotas, loadingRotas } = useRotaVinculadaCombo();

  const onSubmit: SubmitHandler<ViagemFiltroData> = (data) => {
    const filtro: ViagemFiltro = {
      caminhaoId: normalizarId(data.caminhaoId),
      carretaId: normalizarId(data.carretaId),
      empregadoraId: normalizarId(data.empregadoraId),
      motoristaId: normalizarId(data.motoristaId),
      rotaVinculadaId: normalizarId(data.rotaVinculadaId),
      status: data.viagemStatus,
      dataInicio: filtroAtual.dataInicio ?? undefined,
      dataFim: filtroAtual.dataFim ?? undefined,

    };

    setLoading(true);
    onApplyFiltro({
  ...filtroAtual,
  ...filtro,
});

    setLoading(false);
  };

  return {
    control,
    errors,
    loading,
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
