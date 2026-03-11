import { z } from 'zod';
import { dateField } from '../types/dateField';
import { numberBR } from '../utils/zodHelpers';

export const caminhaoSchema = z.object({
  caminhaoNome: z
    .string()
    .min(2, 'Nome é obrigatório e deve ter pelo menos 2 caracteres'),

  caminhaoAnoFabricacao: z.coerce
    .number({
      required_error: 'Ano de fabricação é obrigatório',
      invalid_type_error: 'Ano inválido',
    })
    .min(1900, 'Ano de fabricação inválido')
    .max(new Date().getFullYear(), 'Ano não pode ser no futuro'),

  caminhaoPlaca: z
    .string()
    .min(7, 'Placa é obrigatória e inválida')
    .max(8, 'Placa é inválida')
    .transform((val) => val.toUpperCase()),

  caminhaoCapacidadeDeCarga: numberBR(
    'Capacidade de carga é obrigatória',
    0.01,
    'Capacidade de carga deve ser maior que 0'
  ),

  caminhaoUltimaManutencao: dateField(
    'Data da última manutenção',
    'obrigatória'
  ).optional(),

  caminhaoTrocaDeOleo: dateField(
    'Data da última troca de óleo',
    'obrigatória'
  ).optional(),

  caminhaoStatus: z.enum(['Ativo', 'Inativo', 'Manutenção'], {
    required_error: 'Selecione o status do caminhão',
  }),

  empregadoraId: z
    .string()
    .min(1, 'Selecione a empregadora'),

  caminhaoDocumentos: z.object({
    ipva: z
      .object({
        dataExpiracao: dateField('Data do IPVA', 'obrigatória').optional(),
        status: z.enum(['Válido', 'A vencer', 'Vencido']).optional(),
      })
      ,

    seguro: z.object({
      dataExpiracao: dateField('Data do seguro', 'obrigatória').optional(),
      status: z.enum(['Válido', 'Expirado']).optional(),
    }),

    crlv: z.object({
      dataExpiracao: dateField('Data do CRLV', 'obrigatória').optional(),
      status: z.enum(['Válido', 'Em processo', 'Vencido']).optional(),
    }),
  }).optional(),
});

export type CaminhaoFormData = z.infer<typeof caminhaoSchema>;