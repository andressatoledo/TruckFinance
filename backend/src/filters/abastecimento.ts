import { Types } from 'mongoose';
import {criarDataUTC, criarRangeNumerico} from '../utils/filtroFunction';

interface QueryAbastecimento {
  caminhaoId?: string;

  abastecimentoDataInicio?: string;
  abastecimentoDataFim?: string;

  abastecimentoValorMin?: string;
  abastecimentoValorMax?: string;

  abastecimentoLitrosMin?: string;
  abastecimentoLitrosMax?: string;

  abastecimentoKmMin?: string;
   abastecimentoKmMax?: string;

  abastecimentoTipoPagamento?: string;
  abastecimentoObservacao?: string;
}

export function montarFiltroAbastecimento(
  query: QueryAbastecimento,
) {

  const filtro: any = {};


  // 🔹 caminhaoId
  if (query.caminhaoId && Types.ObjectId.isValid(query.caminhaoId)) {
    filtro.caminhaoId = new Types.ObjectId(query.caminhaoId);
  }

  // 🔹 Datas
  const dataInicio = criarDataUTC(query.abastecimentoDataInicio ?? '');
  const dataFim = criarDataUTC(query.abastecimentoDataFim ?? '', true);

  if (dataInicio || dataFim) {
    filtro.abastecimentoData = {};

    if (dataInicio) filtro.abastecimentoData.$gte = dataInicio;
    if (dataFim) filtro.abastecimentoData.$lte = dataFim;
  }

  // 🔹 Valor
  const valorRange = criarRangeNumerico(query.abastecimentoValorMin, query.abastecimentoValorMax);
  if (valorRange) {
    filtro.abastecimentoValor = valorRange;
  }

  // 🔹 Litros
  const litrosRange = criarRangeNumerico(query.abastecimentoLitrosMin, query.abastecimentoLitrosMax);
  if (litrosRange) {
    filtro.abastecimentoLitros = litrosRange;
  }

  // 🔹 KM
  const kmRange = criarRangeNumerico(query.abastecimentoKmMin, query.abastecimentoKmMax);
  if (kmRange) {
    filtro.abastecimentoKm = kmRange;
  }

  // 🔹 Tipo de pagamento
  if (query.abastecimentoTipoPagamento) {
    filtro.abastecimentoTipoPagamento = query.abastecimentoTipoPagamento;
  }

  // 🔹 Observação (busca parcial)
  if (query.abastecimentoObservacao) {
    filtro.abastecimentoObservacao = {
      $regex: query.abastecimentoObservacao,
      $options: 'i',
    };
  }

  return filtro;
}
