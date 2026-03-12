
import {CaminhaoStatus} from './caminhaoStatus'
import {CaminhaoDocumentos} from './caminhaoDocumento'

export default interface CaminhaoFiltro {

  _id?: string;            
  caminhaoNome?: string;
  caminhaoAnoFabricacao?: number;
  caminhaoPlaca?: string;
  caminhaoDocumentos?: CaminhaoDocumentos;
  caminhaoCapacidadeDeCarga?: number;
  caminhaoUltimaManutencao?: string | Date;
  caminhaoTrocaDeOleo?: string | Date;
  caminhaoStatus?: CaminhaoStatus;
  empregadoraId?: string;
}
