// viagemFiltro.schema.ts
import { z } from 'zod';

export const viagemFiltroSchema = z.object({
  motoristaId: z.string().optional(),
  caminhaoId: z.string().optional(),
  carretaId: z.string().optional(),
  empregadoraId: z.string().optional(),
  rotaVinculadaId: z.string().optional(),
  viagemStatus: z.string().optional(),
});




export type ViagemFiltroData = z.infer<typeof viagemFiltroSchema>;