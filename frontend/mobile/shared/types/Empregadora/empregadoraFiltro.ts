import { EmpregadoraStatus } from './empregadoraStatus';

export default interface EmpregadoraFiltro {
  _id?: string;
  empregadoraNome?: string;
  empregadoraHasAdiantamento?: boolean;
  empregadoraValorAdiantamentoMin?: number;
  empregadoraValorAdiantamentoMax?: number;
  empregadoraPrazoPagamento?: string;
  empregadoraStatus?: EmpregadoraStatus;
}