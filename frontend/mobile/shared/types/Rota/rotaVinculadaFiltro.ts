import {RotaVinculadaModeloPagamento} from './rotaVinculadaModeloPagamento';

export interface RotaVinculadaFiltro {
  _id?: string;               
  rotaVinculadaObservacao?: string;
  rotaVinculadaValor?: number;
  rotaVinculadaModeloPagamento?: RotaVinculadaModeloPagamento;
  rotaIdaId?: string;
  rotaVoltaId?: string;
  cargaId?: string;
}
