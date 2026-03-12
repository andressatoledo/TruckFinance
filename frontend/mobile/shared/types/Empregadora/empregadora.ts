import {EmpregadoraStatus} from './empregadoraStatus';
import { EmpregadoraPrazoPagamento } from "./empregadoraPrazoPagamento";

export interface Empregadora {
  _id?: string;
  empregadoraNome: string;
  empregadoraHasAdiantamento?: boolean;
  empregadoraValorAdiantamento?: number;
  empregadoraPrazoPagamento: EmpregadoraPrazoPagamento;
  empregadoraStatus: EmpregadoraStatus;
}