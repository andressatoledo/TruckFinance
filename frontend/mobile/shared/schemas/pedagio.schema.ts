import { z } from 'zod';


export const pedagioSchema = z.object({

  pedagioNome: z.string().min(1, 'Nome é obrigatório'),
  pedagioLocalizacao: z.string().optional(),
    pedagioRodovia: z.string().optional(),

});


export type PedagioFormData = z.infer<typeof pedagioSchema>;
