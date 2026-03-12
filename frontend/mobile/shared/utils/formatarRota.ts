import { Viagem } from '../types/Viagem/viagem';

export function formatarRota(viagem: Viagem) {
  // ajuste conforme seu backend
  console.log('viagem',viagem)
  if ((viagem as any).rotaVinculada?.rotaNome) {
    return (viagem as any).rotaVinculada.rotaNome;
  }

  return 'Rota não informada';
}