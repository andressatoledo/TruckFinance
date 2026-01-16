import { ViagemService } from './viagemService';
import { AbastecimentoService } from './abastecimentoService';
import { AbastecimentoFiltro } from '../types/abastecimentofiltro';
import { Viagem } from '../types/viagem';
import { CarteiraViagem } from '../types/carteiraViagem';

function extrairData(data?: string | Date) {
  if (!data) return undefined;
  return new Date(data).toISOString().split('T')[0]; // YYYY-MM-DD
}

export const CarteiraViagemService = {
  async buscarViagens(): Promise<CarteiraViagem[]> {
    const viagens = await ViagemService.buscarTodas();

    const resultado = await Promise.all(
      viagens.map(async (viagem: Viagem) => {
        const filtroAbastecimento: AbastecimentoFiltro = {};

        // caminhao
        if (viagem.caminhaoId) {
          filtroAbastecimento.caminhaoId = viagem.caminhaoId;
        }

        // data início
        if (viagem.viagemDataInicio) {
          const dataInicio = extrairData(viagem.viagemDataInicio);
          filtroAbastecimento.dataInicio = dataInicio;
          filtroAbastecimento.dataFim = dataInicio;
        }

        // se tiver data fim, sobrescreve
        if (viagem.viagemDataFim) {
          filtroAbastecimento.dataFim = extrairData(viagem.viagemDataFim);
        }

        console.log('Filtro enviado:', filtroAbastecimento);

        
       const abastecimentos = await AbastecimentoService.buscarTodas(filtroAbastecimento); const totalDiesel = abastecimentos.reduce((total, a) => { return total + (a.abastecimentoLitros * a.abastecimentoValor); }, 0);

        return {
          viagem,
          diesel: {
            total: totalDiesel,
            itens: abastecimentos,
          },
        };
      })
    );

    return resultado;
  },
};
