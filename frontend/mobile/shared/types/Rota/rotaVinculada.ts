import {RotaVinculadaModeloPagamento} from './rotaVinculadaModeloPagamento';

export interface RotaVinculada {
  _id?: string;               
  rotaVinculadaObservacao: string;
  rotaVinculadaValor: number;
  rotaVinculadaModeloPagamento: RotaVinculadaModeloPagamento;
  rotaIdaId?: string;
  rotaVoltaId?: string;
  cargaId?: string;
}
