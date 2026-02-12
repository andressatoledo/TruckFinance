import { z } from 'zod';
import {dateField} from '../types/dateField'

export const viagemStatusEnum = [
  'AguardandoPagamento',
  'Pago',
] as const;


export const viagemSchema = z.object({
  viagemDataInicio: dateField,
  viagemOrigemEixos: z.enum(['Default', 'Manual']).default('Default'),
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
    
  viagemEixosIda: z.coerce
    .number()
    .positive('Informe a quantidade de eixos na ida'),


  viagemEixosVolta: z.coerce
    .number()
    .positive('Informe a quantidade de eixos na volta'),


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
