import { CarretaStatus } from './carretaStatus';
import { CarretaTipo } from './carretaTipo';

export default interface CarretaFiltro {
  _id?: string;          
  carretaQuantidadeEixosVazio?: number;
  carretaQuantidadeEixosCheio?: number;
  carretaTipo?: CarretaTipo;
  carretaPlaca?: string;
  carretaStatus?: CarretaStatus;
  carretaEixosVazio?: number;
  carretaEixosCheio?: number;
}
