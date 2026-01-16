// import mongoose from 'mongoose';

// // Models
import { Alerta } from '../models/alerta';
import { Abastecimento } from '../models/abastecimento';
import { Caminhao } from '../models/caminhao';
import { Carga } from '../models/carga';
import { Carreta } from '../models/carreta';
import { Empregadora } from '../models/empregadora';
import { Manutencao } from '../models/manutencao';
import { Motorista } from '../models/motorista';
import { Pedagio } from '../models/pedagio';
import { PedagioValor } from '../models/pedagioValor';
import { Rota } from '../models/rota';
import { RotaPedagio } from '../models/rotaPedagio';
import { RotaVinculada } from '../models/rotaVinculada';
import { Viagem } from '../models/viagem';
import { ViagemDocumento } from '../models/viagemDocumento';

// export async function seedDatabase() {
//   const models = [
//     Alerta,
//     Abastecimento,
//     Caminhao,
//     Carga,
//     Carreta,
//     Empregadora,
//     Manutencao,
//     Motorista,
//     Pedagio,
//     PedagioValor,
//     Rota,
//     RotaPedagio,
//     RotaVinculada,
//     Viagem,
//     ViagemDocumento,
//   ];

//   for (const model of models) {
//     try {
//       // cria a coleção se não existir
//       await model.createCollection();

//       // garante índices do schema
//       await model.syncIndexes();

//       console.log(`✅ Coleção pronta: ${model.collection.name}`);
//     } catch (error) {
//       console.error(
//         `❌ Erro ao criar coleção ${model.modelName}:`,
//         error
//       );
//     }
//   }
// }


export async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seed...');

    // Limpa dados antigos (opcional)
    // await Promise.all([
    //   Carreta.deleteMany({}),
    //   Carga.deleteMany({}),
    //   Caminhao.deleteMany({}),
    //   Empregadora.deleteMany({}),
    //   Motorista.deleteMany({}),
    // ]);

    // =====================
    // EMPREGADORA
    // =====================
    // const empregadora = await Empregadora.create({
    //   empregadoraHasAdiantamento: true,
    //   empregadoraValorAdiantamento: 1500,
    //   empregadoraPrazoPagamento: 'Mensal',
    //   empregadoraStatus: 'Ativo',
    // });

    const abastecimento = await Abastecimento.create({
      abastecimentoLitros: 150,
      abastecimentoValor: 5.89,
      abastecimentoData: "2026-01-30T00:00:00.000Z",
      abastecimentoKm: 123456,
      abastecimentoTipoPagamento: "À vista",
      abastecimentoPrazoPagamento: "Imediato",
      abastecimentoObservacao: "Abastecimento de teste",
      caminhaoId: "6965a0c58c7c55732290dff0"
      });


    // =====================
    // CARRETA
    // =====================
    // const carreta = await Carreta.create({
    //   carretaQuantidadeEixosVazio: 3,
    //   carretaQuantidadeEixosCheio: 5,
    //   carretaTipo: 'Graneleira',
    //   carretaStatus: 'Ativo',
    // });

    // =====================
    // CARGA
    // =====================
    // const carga = await Carga.create({
    //   cargaTipo: 'Soja',
    // });

    // =====================
    // CAMINHÃO
    // =====================
    // const caminhao = await Caminhao.create({
    //   caminhaoNome: 'Scania R450',
    //   caminhaoAnoFabricacao: 2020,
    //   caminhaoPlaca: 'ABC1D23',
    //   caminhaoCapacidadeDeCarga: 35000,
    //   caminhaoStatus: 'Ativo',
    //   caminhaoUltimaManutencao: new Date('2025-10-01'),
    //   caminhaoTrocaDeOleo: new Date('2025-11-15'),

    //   caminhaoDocumentos: {
    //     ipva: {
    //       dataExpiracao: new Date('2026-01-31'),
    //     },
    //     seguro: {
    //       dataExpiracao: new Date('2026-06-30'),
    //     },
    //     crlv: {
    //       dataExpiracao: new Date('2026-03-31'),
    //     },
    //   },

    //   empregadoraId: empregadora._id,
    // });

    // =====================
    // MOTORISTA
    // =====================
    // const motorista = await Motorista.create({
    //   motoristaNome: 'João da Silva',
    //   motoristaStatus: 'Ativo',
    //   motoristaDataVencimentoHabilitacao: new Date('2027-08-20'),
    //   caminhaoId: caminhao._id,
    //   carretaId: carreta._id,
    // });

    console.log('✅ Seed concluído com sucesso!');
    console.log({
      // empregadora,
      // carreta,
      // carga,
      // caminhao,
      // motorista,
      abastecimento
    });

  } catch (error) {
    console.error('❌ Erro ao executar seed:', error);
  }
}
