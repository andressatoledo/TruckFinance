import { z } from 'zod';
import { numberBR } from '../utils/zodHelpers';

export const pedagioValorSchema = z.object({
  _id: z.string().optional(),
  pedagioValorNumeroEixos: numberBR(
    'Número de eixos é obrigatório',
    1,
    'Deve ter ao menos 1 eixo',
  ),

  pedagioValorPedagio: numberBR(
    'Valor do pedágio é obrigatório',
    0.01,
    'Valor deve ser maior que zero',
  ),

  pedagioId: z.string().optional(),
});

export type PedagioValorFormData = z.infer<typeof pedagioValorSchema>;
