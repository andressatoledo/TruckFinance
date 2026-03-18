import { z } from 'zod';
import { dateField } from '../types/Outros/dateField';
import { numberBR } from '../utils/zodHelpers';
import {
  TipoPagamentoEnum,
  ParcelamentoEnum,
} from '../types/Outros/financeiroEnum';

export const abastecimentoSchema = z
  .object({
    abastecimentoData: dateField(
      'Data de abastecimento',
      'obrigatória'
    ),

    caminhaoId: z.string().min(1, 'Selecione o caminhão'),

    abastecimentoLitros: numberBR(
      'Litros abastecidos é obrigatório',
      0.0001,
      'Litros abastecidos é obrigatório'
    ),

    abastecimentoValor: numberBR(
      'Valor total é obrigatório',
      0.01,
      'Valor total é obrigatório'
    ),

    abastecimentoKm: numberBR(
      'Km inválido',
      0,
      'Km deve ser maior ou igual a zero'
    ).optional(),

    abastecimentoTipoPagamento: z
      .enum(Object.values(TipoPagamentoEnum) as [string, ...string[]])
      .optional(),

    abastecimentoPrazoPagamento: z
      .enum(Object.values(ParcelamentoEnum) as [string, ...string[]])
      .optional(),

    abastecimentoObservacao: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const tipo = data.abastecimentoTipoPagamento;
    const prazo = data.abastecimentoPrazoPagamento;

    // 🔹 Se informou parcelamento, precisa ter tipo
    if (prazo && !tipo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['abastecimentoTipoPagamento'],
        message: 'Tipo de pagamento é obrigatório para usar parcelamento',
      });
    }

    // 🔹 Se tipo for dinheiro ou pix, não pode parcelar
    if (
      prazo &&
      (tipo === TipoPagamentoEnum.DINHEIRO ||
        tipo === TipoPagamentoEnum.PIX)
    ) {
      if (prazo !== ParcelamentoEnum.A_VISTA) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['abastecimentoPrazoPagamento'],
          message: 'Dinheiro ou PIX não permitem parcelamento',
        });
      }
    }

    // 🔹 Se parcelamento for maior que 1x
    if (
      prazo &&
      prazo !== ParcelamentoEnum.A_VISTA &&
      prazo !== '1X'
    ) {
      if (
        tipo !== TipoPagamentoEnum.CARTAO_CREDITO &&
        tipo !== TipoPagamentoEnum.A_PRAZO
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['abastecimentoTipoPagamento'],
          message:
            'Parcelamento só é permitido para Cartão de Crédito ou A Prazo',
        });
      }
    }
  });

export type AbastecimentoFormData =
  z.infer<typeof abastecimentoSchema>;