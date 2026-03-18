export const formatDate = (date?: Date | string) => {
  if (!date) return '';

  const parsed = new Date(date);

  return isNaN(parsed.getTime())
    ? ''
    : parsed.toLocaleDateString('pt-BR');
};