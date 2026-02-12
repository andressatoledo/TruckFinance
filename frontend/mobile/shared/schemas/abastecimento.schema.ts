import { z } from 'zod';
import {dateField} from '../types/dateField'


export const abastecimentoSchema = z.object({
  abastecimentoData: dateField,

  caminhaoId: z.string().min(1, 'Selecione o caminhão'),

  abastecimentoLitros: z.coerce
    .number()
    .positive('Informe os litros'),

  abastecimentoValor: z.coerce
    .number()
    .positive('Informe o valor'),

  abastecimentoKm: z.coerce
    .number().optional(),
  

  abastecimentoTipoPagamento:z.coerce
    .string().optional(),

    abastecimentoPrazoPagamento:z.coerce
    .string().optional(),

  abastecimentoObservacao:z.coerce
    .string().optional(),
});


export type AbastecimentoFormData = z.infer<typeof abastecimentoSchema>;
