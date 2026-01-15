import { useEffect, useState } from 'react';
import { Viagem } from '../../shared/types/Viagem';
import {
  ViagemService
} from '../../shared/services/ViagemService';
import { normalizarId } from './normalizar';
import { RotaVinculadaService } from '../../shared/services/rotaVinculadaService';

type Mode = 'create' | 'edit' | 'view';

type ViagemIdFields =
  | 'caminhaoId'
  | 'carretaId'
  | 'empregadoraId'
  | 'motoristaId'
  | 'rotaVinculadaId';

function limparIdsParaEnvio(data: Viagem): Partial<Viagem> {
  const payload: Partial<Viagem> = { ...data };

  const ids: ViagemIdFields[] = [
    'caminhaoId',
    'carretaId',
    'empregadoraId',
    'motoristaId',
    'rotaVinculadaId',
  ];

  ids.forEach((id) => {
    if (payload[id] === '') {
      delete payload[id];
    }
  });

  return payload;
}

export function useViagemForm(mode: Mode, viagemId?: string) {
  const [data, setData] = useState<Viagem>({
    viagemStatus: 'AguardandoPagamento',
  } as Viagem);

  const [loading, setLoading] = useState(false);

  const readOnly = mode === 'view';

  useEffect(() => {
    if ((mode === 'edit' || mode === 'view') && viagemId) {
      setLoading(true);
      ViagemService.buscarPorId(viagemId)
        .then((viagem) => {
          setData({
            ...viagem,
            // garante string vazia para combos
            caminhaoId: normalizarId(viagem.caminhaoId),
            carretaId: normalizarId(viagem.carretaId),
            empregadoraId: normalizarId(viagem.empregadoraId),
            motoristaId: normalizarId(viagem.motoristaId),
            rotaVinculadaId: normalizarId(viagem.rotaVinculadaId),
          });
        })
        .finally(() => setLoading(false));
    }
  }, [mode, viagemId]);

  useEffect(() => {
  if (!data.rotaVinculadaId) return;

  RotaVinculadaService.buscarPorId(data.rotaVinculadaId)
    .then((rota) => {
      setData((prev) => ({
        ...prev,
        viagemValorTonelada: rota.rotaVinculadaValor, 
      }));
    });
}, [data.rotaVinculadaId]);

  async function submit() {
    if (!data) return;

    const payload = limparIdsParaEnvio(data);

    if (mode === 'create') {
      return ViagemService.criar(payload);
    }

    if (mode === 'edit' && viagemId) {
      return ViagemService.atualizar(viagemId, payload);
    }
  }

  return {
    data,
    setData,
    submit,
    loading,
    readOnly,
  };
}
