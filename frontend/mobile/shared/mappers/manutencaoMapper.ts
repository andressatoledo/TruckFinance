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
      : undefined,

    caminhaoId: manutencao.caminhaoId,
    carretaId: manutencao.carretaId,
    manutencaoLocal: manutencao.manutencaoLocal,
    manutencaoObservacao: manutencao.manutencaoObservacao,

    manutencaoDocumentos: manutencao.manutencaoDocumentos?.map(
      doc => doc.url
    )
  };
}