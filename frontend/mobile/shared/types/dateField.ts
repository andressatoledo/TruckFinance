import { z } from 'zod';

export const dateField = (field?: string, field_required?:string) =>
  z.preprocess((value) => {
    if (!value) return undefined;

    if (value instanceof Date) return value;

    if (typeof value === 'string' || typeof value === 'number') {
      const d = new Date(value);
      if (!isNaN(d.getTime())) return d;
    }

    return undefined;
  },
  z.date({
    required_error: `${field} é ${field_required}`,
    invalid_type_error: `Data inválida`
  }));