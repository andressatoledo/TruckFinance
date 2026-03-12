import { z } from 'zod';
import { numberBR } from '../utils/zodHelpers';
import { ManutencaoTipoOptions } from '../types/Manutencao/manutencaoTipo';
import { ManutencaoCategoriaOptions } from '../types/Manutencao/manutencaoCategoria';

export const manutencaoSchema = z
  .object({
    manutencaoDescricao: z
      .string()
      .min(1, 'Descrição é obrigatória')
      .transform(val => val.trim()),

    manutencaoTipo: z.preprocess(
      val => (val === '' ? undefined : val),
      z.enum(ManutencaoTipoOptions, {
        required_error: 'Selecione o tipo da manutenção',
      }),
    ),

    manutencaoCategoria: z.preprocess(
      val => (val === '' ? undefined : val),
      z.enum(ManutencaoCategoriaOptions, {
        required_error: 'Selecione a categoria da manutenção',
      }),
    ),

    manutencaoData: z.preprocess(
      val => (val === '' ? undefined : val),
      z.union([z.string(), z.date()], {
        required_error: 'Data da manutenção é obrigatória',
      }),
    ),

    manutencaoKm: numberBR(
      'KM é obrigatório',
      0,
      'KM deve ser maior ou igual a 0',
    ),

    manutencaoValor: z.preprocess(
      val => (val === '' ? undefined : val),
      numberBR(
        'Valor inválido',
        0,
        'Valor deve ser maior ou igual a 0',
      ).optional(),
    ),

    manutencaoProximoKm: z.preprocess(
      val => (val === '' ? undefined : val),
      numberBR(
        'KM inválido',
        0,
        'KM deve ser maior ou igual a 0',
      ).optional(),
    ),

    manutencaoProximaData: z.preprocess(
      val => (val === '' ? undefined : val),
      z.union([z.string(), z.date()]).optional(),
    ),

    caminhaoId: z.string().optional(),

    carretaId: z.string().optional(),

    manutencaoLocal: z
      .string()
      .optional()
      .transform(val => val?.trim()),

    manutencaoObservacao: z
      .string()
      .optional()
      .transform(val => val?.trim()),

    manutencaoDocumentos: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.caminhaoId && !data.carretaId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Informe um caminhão ou uma carreta',
        path: ['caminhaoId'],
      });
    }
  });

export type ManutencaoFormData = z.infer<typeof manutencaoSchema>;