import { Caminhao } from "../types/Caminhao/caminhao";
import { CaminhaoFormData } from "../schemas/caminhao.schema";
import {mapDate} from "../utils/mapDate";

export function mapCaminhaoToForm(
  caminhao: Caminhao
): CaminhaoFormData {
  return {
    caminhaoNome: caminhao.caminhaoNome,
    caminhaoAnoFabricacao: caminhao.caminhaoAnoFabricacao,
    caminhaoPlaca: caminhao.caminhaoPlaca,

    caminhaoCapacidadeDeCarga: caminhao.caminhaoCapacidadeDeCarga,

    caminhaoUltimaManutencao: caminhao.caminhaoUltimaManutencao
      ? new Date(caminhao.caminhaoUltimaManutencao)
      : undefined,

    caminhaoTrocaDeOleo: caminhao.caminhaoTrocaDeOleo
      ? new Date(caminhao.caminhaoTrocaDeOleo)
      : undefined,

    caminhaoStatus: caminhao.caminhaoStatus,
    empregadoraId: caminhao.empregadoraId,

    caminhaoDocumentos: {
  ipva: {
    dataExpiracao: mapDate(caminhao.caminhaoDocumentos?.ipva?.dataExpiracao),
    status: caminhao.caminhaoDocumentos?.ipva?.status ?? undefined,
  },
  seguro: {
    dataExpiracao: mapDate(caminhao.caminhaoDocumentos?.seguro?.dataExpiracao),
    status: caminhao.caminhaoDocumentos?.seguro?.status ?? undefined,
  },
  crlv: {
    dataExpiracao: mapDate(caminhao.caminhaoDocumentos?.crlv?.dataExpiracao),
    status: caminhao.caminhaoDocumentos?.crlv?.status ?? undefined,
  },
}
  };
}