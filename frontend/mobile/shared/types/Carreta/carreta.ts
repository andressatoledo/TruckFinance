import {CarretaTipo} from './carretaTipo';
import {CarretaStatus}  from './carretaStatus';

export interface Carreta {

  _id?: string; 
  carretaPlaca: string;
  carretaTipo: CarretaTipo;
  carretaStatus: CarretaStatus;
  carretaQuantidadeEixosVazio: number;
  carretaQuantidadeEixosCheio: number;
  carretaEixosVazio: number;
  carretaEixosCheio: number;
}