import { Types } from 'mongoose';

export function montarFiltroViagem(query: any) {
  const filtro: any = {};

  /* 📅 PERÍODO */
  if (query.dataInicio || query.dataFim) {
    filtro.viagemDataInicio = {};

    if (query.dataInicio) {
      filtro.viagemDataInicio.$gte = new Date(query.dataInicio);
    }

    if (query.dataFim) {
      const fim = new Date(query.dataFim);
      fim.setHours(23, 59, 59, 999);
      filtro.viagemDataInicio.$lte = fim;
    }
  }

  /* 🔄 STATUS */
  if (query.status) {
    filtro.viagemStatus = query.status;
  }

  /* 🧑‍✈️ IDs */
  if (query.empregadoraId && Types.ObjectId.isValid(query.empregadoraId)) {
    filtro.empregadoraId = new Types.ObjectId(query.empregadoraId);
  }

  if (query.motoristaId && Types.ObjectId.isValid(query.motoristaId)) {
    filtro.motoristaId = new Types.ObjectId(query.motoristaId);
  }

  if (query.caminhaoId && Types.ObjectId.isValid(query.caminhaoId)) {
    filtro.caminhaoId = new Types.ObjectId(query.caminhaoId);
  }

  if (query.carretaId && Types.ObjectId.isValid(query.carretaId)) {
    filtro.carretaId = new Types.ObjectId(query.carretaId);
  }

  if (query.rotaVinculadaId && Types.ObjectId.isValid(query.rotaVinculadaId)) {
    filtro.rotaVinculadaId = new Types.ObjectId(query.rotaVinculadaId);
  }

  /* 💰 VALORES */
  if (query.valorMin || query.valorMax) {
    filtro['viagemTotais.viagemFrete'] = {};

    if (query.valorMin) {
      filtro['viagemTotais.viagemFrete'].$gte = Number(query.valorMin);
    }

    if (query.valorMax) {
      filtro['viagemTotais.viagemFrete'].$lte = Number(query.valorMax);
    }
  }

  if (query.toneladaMin || query.toneladaMax) {
    filtro['ValorTonelada'] = {};

    if (query.toneladaMin) {
      filtro['ValorTonelada'].$gte = Number(query.toneladaMin);
    }

    if (query.toneladaMax) {
      filtro['ValorTonelada'].$lte = Number(query.toneladaMax);
    }
  }

  /* 🔢 NÚMERO DA VIAGEM */
  if (query.viagemNumero) {
    filtro.viagemNumero = Number(query.viagemNumero);
  }

  return filtro;
}