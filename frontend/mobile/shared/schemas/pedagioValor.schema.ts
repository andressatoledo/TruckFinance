import { z } from 'zod';


export const pedagioValorSchema = z.object({
  _id: z.string().optional(),
  pedagioValorNumeroEixos: z
    .number({ required_error: 'Número de eixos é obrigatório' })
    .min(1, 'Deve ter ao menos 1 eixo'),

  pedagioValorPedagio: z
    .number({ required_error: 'Valor é obrigatório' })
    .min(0.01, 'Valor deve ser maior que zero'),

  pedagioId: z.string().optional(),
});


export type PedagioValorFormData = z.infer<typeof pedagioValorSchema>;
