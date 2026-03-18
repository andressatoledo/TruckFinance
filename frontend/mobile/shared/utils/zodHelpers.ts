import { z } from 'zod';
export function numberBR(
  requiredMessage: string,
  minValue?: number,
  minMessage?: string
) {
  return z.preprocess(
    (value) => {
      if (value === '' || value === null || value === undefined) {
        return undefined; 
      }

      if (typeof value === 'string') {
        const trimmed = value.trim();

        if (!trimmed) return undefined;

        if (trimmed === ',' || trimmed === '.') return NaN;

        const normalized = trimmed.replace(',', '.');
        const parsed = Number(normalized);

        return isNaN(parsed) ? NaN : parsed;
      }

      return value;
    },
    z
      .number({
        required_error: requiredMessage,
        invalid_type_error: 'Informe um número válido',
      })
      .refine(
        (val) =>
          val === undefined ||
          (minValue !== undefined ? val >= minValue : true),
        {
          message:
            minValue !== undefined
              ? minMessage ?? `Deve ser maior ou igual a ${minValue}`
              : '',
        }
      )
      .optional() 
  );
}