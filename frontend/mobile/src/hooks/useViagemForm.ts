import { useEffect, useState } from 'react';
import { Viagem } from '../../shared/types/Viagem';
import {
  ViagemService
} from '../../shared/services/ViagemService';

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
    viagemStatus: 'Aguardando pagamento',
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
            caminhaoId: viagem.caminhaoId ?? '',
            carretaId: viagem.carretaId ?? '',
            empregadoraId: viagem.empregadoraId ?? '',
            motoristaId: viagem.motoristaId ?? '',
            rotaVinculadaId: viagem.rotaVinculadaId ?? '',
          });
        })
        .finally(() => setLoading(false));
    }
  }, [mode, viagemId]);

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
