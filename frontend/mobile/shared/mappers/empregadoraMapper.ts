import { Empregadora } from "../types/Empregadora/empregadora";
import { EmpregadoraFormData } from "../schemas/empregadora.schema";

export function mapEmpregadoraToForm(
  empregadora: Empregadora
): EmpregadoraFormData {
  return {
    empregadoraNome: empregadora.empregadoraNome ?? '',
    empregadoraHasAdiantamento: empregadora.empregadoraHasAdiantamento,
    empregadoraValorAdiantamento: empregadora.empregadoraValorAdiantamento,
    empregadoraPrazoPagamento: empregadora.empregadoraPrazoPagamento,
    empregadoraStatus: empregadora.empregadoraStatus
  };
}