import { criarRangeNumerico, criarDataUTC } from "../utils/filtroFunction";

interface QueryCaminhao {
   carretaTipo?: string;
  carretaPlaca?: string;

  carretaQuantidadeEixosVazioMin?: string;
  carretaQuantidadeEixosVazioMax?: string;

  carretaQuantidadeEixosCheioMin?: string;
  carretaQuantidadeEixosCheioMax?: string;

 

}

export function montarFiltroCarreta(query: QueryCaminhao) {
  const filtro: any = {};

  if (query.carretaTipo) {
    filtro.carretaTipo = {
      $regex: query.carretaTipo,
      $options: "i",
    };
  }

  
  if (query.carretaPlaca) {
    filtro.carretaPlaca = {
      $regex: query.carretaPlaca,
      $options: "i",
    };
  }


  // Eixos vazios
  const capacidadeRange = criarRangeNumerico(
    query.carretaQuantidadeEixosVazioMin,
    query.carretaQuantidadeEixosVazioMax,
  );
  if (capacidadeRange) {
    filtro.carretaQuantidadeEixosVazio = capacidadeRange;
  }

  // Eixos cheio
  const eixosCheioRange = criarRangeNumerico(
    query.carretaQuantidadeEixosCheioMin,
    query.carretaQuantidadeEixosCheioMax,
  );
  if (eixosCheioRange) {
    filtro.carretaQuantidadeEixosCheio = eixosCheioRange;
  }

 

  return filtro;
}
