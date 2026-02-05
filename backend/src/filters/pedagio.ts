export function montarFiltroPedagio(query: any) {
  const filtro: any = {};

  if (query.pedagioNome) {
    filtro.pedagioNome = {
      $regex: query.pedagioNome.trim(),
      $options: 'i',
    };
  }

  if (query.pedagioRodovia) {
    filtro.pedagioRodovia = {
      $regex: query.pedagioRodovia.trim(),
      $options: 'i',
    };
  }

  if (query.pedagioLocalizacao) {
    filtro.pedagioLocalizacao = {
      $regex: query.pedagioLocalizacao.trim(),
      $options: 'i',
    };
  }

  return filtro;
}
