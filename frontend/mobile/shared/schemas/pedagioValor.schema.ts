import { z } from 'zod';


export const pedagioValorSchema = z.object({
  _id: z.string().optional(),
  pedagioValor: z.number().optional(),
  pedagioValorNumeroEixos: z.number().optional(),
  pedagioId: z.string().optional(),
});
