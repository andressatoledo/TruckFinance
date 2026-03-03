import { z } from 'zod';

export function numberBR(
  requiredMessage: string,
  minValue?: number,
  minMessage?: string
) {
  return z.preprocess(
    (value) => {
      if (typeof value === 'string') {
        const trimmed = value.trim();

        // vazio → deixa o Zod tratar como obrigatório
        if (!trimmed) return value;

        // bloqueia apenas , ou .
        if (trimmed === ',' || trimmed === '.') return value;

        const normalized = trimmed.replace(',', '.');
        const parsed = Number(normalized);

        // só converte se for número válido
        if (!isNaN(parsed)) {
          return parsed;
        }

        return value; // deixa o Zod acusar erro
      }

      return value;
    },
    z
      .number({
        required_error: requiredMessage,
        invalid_type_error: 'Informe um número válido',
      })
      .refine((val) =>
        minValue !== undefined ? val >= minValue : true,
        {
          message:
            minValue !== undefined
              ? minMessage ?? `Deve ser maior ou igual a ${minValue}`
              : '',
        }
      )
  );
}