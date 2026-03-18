import { Manutencao } from "../types/Manutencao/manutencao";
import { ManutencaoFormData } from "../schemas/manutencao.schema";

export function mapManutencaoToForm(
  manutencao: Manutencao
): ManutencaoFormData {
  return {
    manutencaoDescricao: manutencao.manutencaoDescricao,
    manutencaoTipo: manutencao.manutencaoTipo,
    manutencaoCategoria: manutencao.manutencaoCategoria,
    manutencaoData: manutencao.manutencaoData
  ? new Date(manutencao.manutencaoData)
  : new Date(),

    manutencaoKm: manutencao.manutencaoKm,
    manutencaoValor: manutencao.manutencaoValor,
    manutencaoProximoKm: manutencao.manutencaoProximoKm,

    manutencaoProximaData:manutencao.manutencaoProximaData
      ? new Date(manutencao.manutencaoProximaData)
      : null, //undefined antes

    caminhaoId: manutencao.caminhaoId?._id ?? '',
    carretaId: manutencao.carretaId?._id ?? '',
    manutencaoLocal: manutencao.manutencaoLocal,
    manutencaoObservacao: manutencao.manutencaoObservacao,

   manutencaoDocumentos:
      manutencao.manutencaoDocumentos?.map((doc) => ({
        nome: doc.nome,
        tipo: doc.tipo,
        tamanho: doc.tamanho,
        url: doc.url,
        uri: undefined, 
        dataUpload: doc.dataUpload,
      })) ?? [],
    
  };
}