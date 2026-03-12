export function normalizarId(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value._id) return value._id;
  return '';
}

export function normalizarTexto(valor?: unknown): string | undefined {
  if (typeof valor !== 'string') return undefined;
  console.log('valor',valor)
  const texto = valor.trim();
 console.log(texto)
  return texto.length > 0 ? texto : undefined;
}
