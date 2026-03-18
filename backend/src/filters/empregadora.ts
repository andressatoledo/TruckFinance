import { criarRangeNumerico } from "../utils/filtroFunction";

interface QueryEmpregadora {
  empregadoraNome?: string;

  empregadoraHasAdiantamento?: string;

  empregadoraValorAdiantamentoMin?: string;
  empregadoraValorAdiantamentoMax?: string;

  empregadoraPrazoPagamento?: string;
  empregadoraStatus?: string;
}

export function montarFiltroEmpregadora(query: QueryEmpregadora) {
  const filtro: any = {};

  // Nome
  if (query.empregadoraNome) {
    filtro.empregadoraNome = {
      $regex: query.empregadoraNome,
      $options: "i",
    };
  }

  // Possui adiantamento
  if (query.empregadoraHasAdiantamento !== undefined) {
    if (query.empregadoraHasAdiantamento === "true") {
      filtro.empregadoraHasAdiantamento = true;
    }

    if (query.empregadoraHasAdiantamento === "false") {
      filtro.empregadoraHasAdiantamento = false;
    }
  }

  // Valor de adiantamento
  const valorRange = criarRangeNumerico(
    query.empregadoraValorAdiantamentoMin,
    query.empregadoraValorAdiantamentoMax,
  );

  if (valorRange) {
    filtro.empregadoraValorAdiantamento = valorRange;
  }

  // Prazo de pagamento
  if (query.empregadoraPrazoPagamento) {
    filtro.empregadoraPrazoPagamento = query.empregadoraPrazoPagamento;
  }

  // Status
  if (query.empregadoraStatus) {
    filtro.empregadoraStatus = query.empregadoraStatus;
  }

  return filtro;
}
