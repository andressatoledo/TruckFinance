export function formatarValor(valor?: number) {
  if (!valor) return '0,00';
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
