import { Viagem } from '../../shared/types/Viagem';

export function formatarRota(viagem: Viagem) {
  // ajuste conforme seu backend
  if ((viagem as any).rotaVinculada?.rotaNome) {
    return (viagem as any).rotaVinculada.rotaNome;
  }

  return 'Rota não informada';
}