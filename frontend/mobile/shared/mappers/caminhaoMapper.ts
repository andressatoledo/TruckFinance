import { Caminhao } from "../types/Caminhao/caminhao";
import { CaminhaoFormData } from "../schemas/caminhao.schema";
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
      : new Date(),
    caminhaoTrocaDeOleo: caminhao.caminhaoTrocaDeOleo
      ? new Date(caminhao.caminhaoTrocaDeOleo)
      : new Date(),

    caminhaoStatus: caminhao.caminhaoStatus,
    empregadoraId: caminhao.empregadoraId,

    caminhaoDocumentos: {
      ipva: {
        dataExpiracao:
          caminhao.caminhaoDocumentos.ipva?.dataExpiracao
      ? new Date(caminhao.caminhaoDocumentos.ipva?.dataExpiracao)
      : new Date(),
        status: caminhao.caminhaoDocumentos?.ipva?.status,
      },
      seguro: {
        dataExpiracao:
         caminhao.caminhaoDocumentos.seguro?.dataExpiracao
      ? new Date(caminhao.caminhaoDocumentos.seguro?.dataExpiracao)
      : new Date(),
        status: caminhao.caminhaoDocumentos?.seguro?.status,
      },
      crlv: {
        dataExpiracao:
          caminhao.caminhaoDocumentos.crlv?.dataExpiracao
      ? new Date(caminhao.caminhaoDocumentos.crlv?.dataExpiracao)
      : new Date(),
        status: caminhao.caminhaoDocumentos?.crlv?.status,
      },
    },
  };
}