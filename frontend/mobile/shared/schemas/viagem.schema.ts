import { z } from 'zod';

// shared/types/viagem.ts
export const viagemStatusEnum = [
  'AguardandoPagamento',
  'Pago',
] as const;

const dateField = z.preprocess(
  (value) => {
    if (value instanceof Date) return value;

    if (typeof value === 'string' || typeof value === 'number') {
      const d = new Date(value);
      return isNaN(d.getTime()) ? undefined : d;
    }

    return undefined;
  },
  z.date().refine(
    (d) => !isNaN(d.getTime()),
    { message: 'Data inválida' }
  )
);

export const viagemSchema = z.object({
  viagemDataInicio: dateField,

  viagemHorarioChegada: z.string().optional(),

  viagemDataFim: dateField.optional(),

  viagemHorarioSaida: z.string().optional(),

  motoristaId: z.string().min(1, 'Selecione o motorista'),
  rotaVinculadaId: z.string().min(1, 'Selecione a rota'),
  empregadoraId: z.string().min(1, 'Selecione a empregadora'),
  caminhaoId: z.string().min(1, 'Selecione o caminhão'),
  carretaId: z.string().min(1, 'Selecione a carreta'),

  viagemToneladaCarregada: z.coerce
    .number()
    .positive('Informe as toneladas'),

  viagemValorTonelada: z.coerce
    .number()
    .positive('Informe o frete'),

  viagemDistancia: z.coerce
    .number().optional(),
    

  viagemStatus: z.enum(viagemStatusEnum)
    .default('AguardandoPagamento'),

  viagemDataPagamento: dateField.optional(),
})
.superRefine((data, ctx) => {
  if (data.viagemStatus === 'Pago' && !data.viagemDataPagamento) {
    ctx.addIssue({
      path: ['viagemDataPagamento'],
      message: 'Informe a data de pagamento',
      code: 'custom',
    });
  }

  if (
    data.viagemDataFim &&
    data.viagemDataFim < data.viagemDataInicio
  ) {
    ctx.addIssue({
      path: ['viagemDataFim'],
      message: 'Data fim não pode ser anterior à data de início',
      code: 'custom',
    });
  }
});


export type ViagemFormData = z.infer<typeof viagemSchema>;
