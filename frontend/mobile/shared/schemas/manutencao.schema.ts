import { z } from 'zod';
import { numberBR, File } from '../utils/zodHelpers';
import { ManutencaoTipoOptions } from '../types/Manutencao/manutencaoTipo';
import { ManutencaoCategoriaOptions } from '../types/Manutencao/manutencaoCategoria';
import { dateField } from '../types/Outros/dateField';

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

    manutencaoData: dateField(
        'Data de manutenção',
        'obrigatória'
      ).nullable(),

    manutencaoKm: numberBR(
      'KM é obrigatório',
      0.01,
      'KM deve ser maior ou igual a 0',
    ).optional(),

    manutencaoValor: numberBR(
        'Valor inválido',
        0,
        'Valor deve ser maior ou igual a 0',
      ),

   manutencaoProximoKm: numberBR(
    'Km inválido',
    0,
    'Km deve ser maior ou igual a 0',
  ).optional(),

    manutencaoProximaData: dateField(
        'Data da próxima manutenção',
        'obrigatória'
      ).nullable().optional(),

    caminhaoId: z.preprocess(
  (val) => (val === null ? undefined : val),
      z.string().optional().transform(val => val?.trim())
    ),

    carretaId: z.preprocess(
  (val) => (val === null ? undefined : val),
      z.string().optional().transform(val => val?.trim())
    ),

      manutencaoLocal: z.preprocess(
  (val) => (val === null ? undefined : val),
      z.string().optional().transform(val => val?.trim())
    ),

    manutencaoObservacao: z.preprocess(
  (val) => (val === null ? undefined : val),
      z.string().optional().transform(val => val?.trim())
    ),

    manutencaoDocumentos: z.array(File()).default([]),
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