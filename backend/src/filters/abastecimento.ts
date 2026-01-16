import { Types } from 'mongoose';

export function montarFiltroAbastecimento(query: any) {
  console.log('FILTROCOMEÇO');
  function criarDataUTC(data: string, fimDoDia = false): Date {
  const [ano, mes, dia] = data.split('-').map(Number);

  if (fimDoDia) {
    return new Date(Date.UTC(ano, mes - 1, dia, 23, 59, 59, 999));
  }

  return new Date(Date.UTC(ano, mes - 1, dia, 0, 0, 0, 0));
}


  const filtro: any = {};

  // caminhaoId → ObjectId
  if (
    query.caminhaoId &&
    typeof query.caminhaoId === 'string' &&
    Types.ObjectId.isValid(query.caminhaoId)
  ) {
    filtro.caminhaoId = new Types.ObjectId(query.caminhaoId);
  }

  // datas → UTC puro
  if (query.dataInicio || query.dataFim) {
    filtro.abastecimentoData = {};

    if (query.dataInicio) {
      filtro.abastecimentoData.$gte = criarDataUTC(query.dataInicio);
    }

    if (query.dataFim) {
      filtro.abastecimentoData.$lte = criarDataUTC(query.dataFim, true);
    }
  }

  console.log('FILTRO GERADO:', JSON.stringify(filtro, null, 2));
  return filtro;
}
