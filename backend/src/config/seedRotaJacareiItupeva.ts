import mongoose from 'mongoose';
import { Rota } from '../models/rota';
import { RotaVinculada } from '../models/rotaVinculada';

export async function seedRotaJacareiItupeva() {
  console.log('🚛 Criando rotas Jacareí ↔ Itupeva...');

  /** =========================
   *  ROTA IDA
   *  ========================= */
  const rotaIda = await Rota.findOneAndUpdate(
    { rotaNome: 'Jacareí, SP → Itupeva, SP' },
    {
      rotaNome: 'Jacareí, SP → Itupeva, SP',
      rotaDescricao: 'Rota de ida de Jacareí para Itupeva',
      rotaOrigem: 'Jacareí, SP',
      rotaDestino: 'Itupeva, SP',
      rotaObservacao: 'Rota padrão de ida',
      rotaDistancia: 85,
    },
    {
      new: true,
      upsert: true, // cria se não existir
    }
  );

  /** =========================
   *  ROTA VOLTA
   *  ========================= */
  const rotaVolta = await Rota.findOneAndUpdate(
    { rotaNome: 'Itupeva, SP → Jacareí, SP' },
    {
      rotaNome: 'Itupeva, SP → Jacareí, SP',
      rotaDescricao: 'Rota de volta de Itupeva para Jacareí',
      rotaOrigem: 'Itupeva, SP',
      rotaDestino: 'Jacareí, SP',
      rotaObservacao: 'Rota padrão de volta',
      rotaDistancia: 85,
    },
    {
      new: true,
      upsert: true,
    }
  );

  /** =========================
   *  ROTA VINCULADA
   *  ========================= */
  await RotaVinculada.findOneAndUpdate(
    {
      rotaIdaId: rotaIda._id,
      rotaVoltaId: rotaVolta._id,
    },
    {
      rotaVinculadaObservacao:
        'Jacareí → Itupeva (Ida) / Itupeva → Jacareí (Volta)',
      rotaVinculadaValor: 1200,
      rotaVinculadaModeloPagamento: 'Viagem',
      rotaIdaId: rotaIda._id,
      rotaVoltaId: rotaVolta._id,
    },
    {
      upsert: true,
      new: true,
    }
  );

  console.log('✅ Rotas e RotaVinculada criadas com sucesso');
}
