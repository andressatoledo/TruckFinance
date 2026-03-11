import { z } from 'zod';
import { numberBR } from '../utils/zodHelpers';

export const carretaSchema = z.object({

  carretaPlaca: z
    .string()
    .min(7, 'Placa é obrigatória e inválida')
    .max(8, 'Placa é inválida')
    .transform((val) => val.toUpperCase()),

  carretaQuantidadeEixosCheio: numberBR(
    'Quantidade de eixos cheio é obrigatória',
    1,
    'Quantidade de eixos cheio deve ser maior que 0'
  ),

  carretaQuantidadeEixosVazio: numberBR(
    'Quantidade de eixos vazio é obrigatória',
    1,
    'Quantidade de eixos vazio deve ser maior que 0'
  ),

    carretaStatus: z.enum(['Ativo', 'Inativo', 'Manutenção'], {
    required_error: 'Selecione o status da carreta',
  }),

  carretaTipo: z.enum(
  [
    'Sider',
    'Baú',
    'Graneleira',
    'Porta contêiner',
    'Cegonha',
    'Tanque',
    'Prancha',
    'Bitrem',
    'Rodotrem',
  ],
  {
    required_error: 'Selecione o tipo da carreta',
  }
)

});

export type CarretaFormData = z.infer<typeof carretaSchema>;