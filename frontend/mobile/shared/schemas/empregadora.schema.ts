import { z } from 'zod';
import { numberBR } from '../utils/zodHelpers';
import { EmpregadoraStatusOptions } from '../types/Empregadora/empregadoraStatus';
import { EmpregadoraPrazoPagamentoOptions } from '../types/Empregadora/empregadoraPrazoPagamento';

export const empregadoraSchema = z.preprocess((data: any) => {

  // Se não possui adiantamento removemos o valor antes da validação
  if (data?.empregadoraHasAdiantamento === false) {
    data.empregadoraValorAdiantamento = undefined;
  }

  return data;

},
z.object({

  empregadoraNome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .transform(val => val.trim().toUpperCase()),

  empregadoraHasAdiantamento: z.boolean().optional(),

  empregadoraValorAdiantamento: z.preprocess(
    val => (val === '' ? undefined : val),
    numberBR(
      'Valor do adiantamento é obrigatório',
      0.01,
      'Valor do adiantamento deve ser maior que 0',
    ).optional(),
  ),

  empregadoraPrazoPagamento: z.preprocess(
    val => (val === '' ? undefined : val),
    z.enum(EmpregadoraPrazoPagamentoOptions, {
      required_error: 'Selecione o prazo de pagamento',
    }),
  ),

  empregadoraStatus: z.preprocess(
    val => (val === '' ? undefined : val),
    z.enum(EmpregadoraStatusOptions, {
      required_error: 'Selecione o status da empregadora',
    }),
  ),

}).superRefine((data, ctx) => {

  if (data.empregadoraHasAdiantamento === true && !data.empregadoraValorAdiantamento) {
    ctx.addIssue({
      path: ['empregadoraValorAdiantamento'],
      code: z.ZodIssueCode.custom,
      message: 'Informe o valor do adiantamento',
    });
  }

}));

export type EmpregadoraFormData = z.infer<typeof empregadoraSchema>;