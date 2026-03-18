import { Types } from 'mongoose';
import {criarDataUTC, criarRangeNumerico} from '../utils/filtroFunction';

interface QueryManutencao {
    manutencaoDescricao?: string;
    manutencaoTipo?: string;
    manutencaoCategoria?: string;
    manutencaoDataInicio?: string;
    manutencaoDataFim?: string;
    manutencaoKmMin?: string;
    manutencaoKmMax?: string;
    manutencaoValorMin?: string;
    manutencaoValorMax?: string;
    manutencaoProximoKm?: string;
    manutencaoProximaData?: string;
    caminhaoId?: string;
    carretaId?: string;
    manutencaoLocal?: string;
    manutencaoObservacao?: string;
}


export function montarFiltroManutencao(
  query: QueryManutencao,
) {

  const filtro: any = {};

  if (query.caminhaoId && Types.ObjectId.isValid(query.caminhaoId)) {
    filtro.caminhaoId = new Types.ObjectId(query.caminhaoId);
  }

  if (query.carretaId && Types.ObjectId.isValid(query.carretaId)) {
    filtro.carretaId = new Types.ObjectId(query.carretaId);
  }
 
  const dataInicio = criarDataUTC(query.manutencaoDataInicio ?? '');
  const dataFim = criarDataUTC(query.manutencaoDataFim ?? '', true);

  if (dataInicio || dataFim) {
    filtro.manutencaoData = {};

    if (dataInicio) filtro.manutencaoData.$gte = dataInicio;
    if (dataFim) filtro.manutencaoData.$lte = dataFim;
  }

  const valorRange = criarRangeNumerico(query.manutencaoValorMin, query.manutencaoValorMax);
  if (valorRange) {
    filtro.manutencaoValor = valorRange;
  }

  const kmRange = criarRangeNumerico(query.manutencaoKmMin, query.manutencaoKmMax);
  if (kmRange) {
    filtro.manutencaoKm = kmRange;
  }

  if (query.manutencaoTipo) {
    filtro.manutencaoTipo = query.manutencaoTipo;
  }

  if (query.manutencaoProximoKm) {
    filtro.manutencaoProximoKm = query.manutencaoProximoKm;
  }

   if (query.manutencaoProximaData) {
    filtro.manutencaoProximaData = criarDataUTC(query.manutencaoProximaData ?? '');
  }

  if (query.manutencaoCategoria) {
    filtro.manutencaoCategoria = query.manutencaoCategoria;
  }

  if (query.manutencaoObservacao) {
    filtro.manutencaoObservacao = {
      $regex: query.manutencaoObservacao,
      $options: 'i',
    };
  }

  if (query.manutencaoDescricao) {
    filtro.manutencaoDescricao = {
      $regex: query.manutencaoDescricao,
      $options: 'i',
    };
  }

   if (query.manutencaoLocal) {
    filtro.manutencaoLocal = {
      $regex: query.manutencaoLocal,
      $options: 'i',
    };
  }

  return filtro;
}
