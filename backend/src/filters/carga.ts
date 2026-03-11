
interface QueryCarga {
  cargaTipo?: string;
  
}

export function montarFiltroCarga(query: QueryCarga) {
  const filtro: any = {};

  if (query.cargaTipo) {
    filtro.cargaTipo = {
      $regex: query.cargaTipo,
      $options: "i",
    };
  }


  return filtro;
}
