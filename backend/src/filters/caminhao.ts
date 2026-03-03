import { criarRangeNumerico, criarDataUTC } from "../utils/filtroFunction";

interface QueryCaminhao {
  caminhaoNome?: string;
  caminhaoPlaca?: string;

  caminhaoAnoFabricacaoMin?: string;
  caminhaoAnoFabricacaoMax?: string;

  caminhaoCapacidadeDeCargaMin?: string;
  caminhaoCapacidadeDeCargaMax?: string;

  caminhaoEixosVazioMin?: string;
  caminhaoEixosVazioMax?: string;

  caminhaoEixosCheioMin?: string;
  caminhaoEixosCheioMax?: string;

  // 🔹 NOVO
  caminhaoDataUltimaManutencaoInicio?: string;
  caminhaoDataUltimaManutencaoFim?: string;

  caminhaoObservacao?: string;
  caminhaoDocumentos?: string;
}

export function montarFiltroCaminhao(query: QueryCaminhao) {
  const filtro: any = {};

  // 🔹 Nome (busca parcial)
  if (query.caminhaoNome) {
    filtro.caminhaoNome = {
      $regex: query.caminhaoNome,
      $options: "i",
    };
  }

  // 🔹 Placa (busca parcial)
  if (query.caminhaoPlaca) {
    filtro.caminhaoPlaca = {
      $regex: query.caminhaoPlaca,
      $options: "i",
    };
  }

  // 🔹 Data da Última Manutenção
  const manutencaoInicio = criarDataUTC(
    query.caminhaoDataUltimaManutencaoInicio ?? "",
  );

  const manutencaoFim = criarDataUTC(
    query.caminhaoDataUltimaManutencaoFim ?? "",
    true,
  );

  if (manutencaoInicio || manutencaoFim) {
    filtro.caminhaoUltimaManutencao = {};

    if (manutencaoInicio)
      filtro.caminhaoUltimaManutencao.$gte = manutencaoInicio;

    if (manutencaoFim) filtro.caminhaoUltimaManutencao.$lte = manutencaoFim;
  }

  // 🔹 Ano fabricação
  const anoRange = criarRangeNumerico(
    query.caminhaoAnoFabricacaoMin,
    query.caminhaoAnoFabricacaoMax,
  );
  if (anoRange) {
    filtro.caminhaoAnoFabricacao = anoRange;
  }

  // 🔹 Capacidade de carga
  const capacidadeRange = criarRangeNumerico(
    query.caminhaoCapacidadeDeCargaMin,
    query.caminhaoCapacidadeDeCargaMax,
  );
  if (capacidadeRange) {
    filtro.caminhaoCapacidadeDeCarga = capacidadeRange;
  }

  // 🔹 Eixos vazio
  const eixosVazioRange = criarRangeNumerico(
    query.caminhaoEixosVazioMin,
    query.caminhaoEixosVazioMax,
  );
  if (eixosVazioRange) {
    filtro.caminhaoEixosVazio = eixosVazioRange;
  }

  // 🔹 Eixos cheio
  const eixosCheioRange = criarRangeNumerico(
    query.caminhaoEixosCheioMin,
    query.caminhaoEixosCheioMax,
  );
  if (eixosCheioRange) {
    filtro.caminhaoEixosCheio = eixosCheioRange;
  }

  // 🔹 Observação (busca parcial)
  if (query.caminhaoObservacao) {
    filtro.caminhaoObservacao = {
      $regex: query.caminhaoObservacao,
      $options: "i",
    };
  }

  // 🔹 Documentos (busca parcial)
  if (query.caminhaoDocumentos) {
    filtro.caminhaoDocumentos = {
      $regex: query.caminhaoDocumentos,
      $options: "i",
    };
  }

  return filtro;
}
