import { z } from 'zod';

export const cargaSchema = z.object({
  cargaTipo: z
    .string()
    .min(2, 'Tipo de carga é obrigatório e deve ter pelo menos 2 caracteres'),
});

export type CargaFormData = z.infer<typeof cargaSchema>;