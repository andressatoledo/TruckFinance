import { Types } from 'mongoose';
// import FilterQuery from 'mongoose'
// import { Abastecimento } from '../models/abastecimento';

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

  function criarDataUTC(data: string, fimDoDia = false): Date | null {
    if (!data) return null;

    const [ano, mes, dia] = data.split('-').map(Number);
    if (!ano || !mes || !dia) return null;

    return fimDoDia
      ? new Date(Date.UTC(ano, mes - 1, dia, 23, 59, 59, 999))
      : new Date(Date.UTC(ano, mes - 1, dia, 0, 0, 0, 0));
  }

  function criarRangeNumerico(min?: string, max?: string) {
    const range: any = {};

    if (min && !isNaN(Number(min))) {
      range.$gte = Number(min);
    }

    if (max && !isNaN(Number(max))) {
      range.$lte = Number(max);
    }

    return Object.keys(range).length > 0 ? range : null;
  }

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
