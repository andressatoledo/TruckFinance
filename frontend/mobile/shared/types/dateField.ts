import { z } from 'zod';

export const dateField = z.preprocess(
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
