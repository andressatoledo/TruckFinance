import { Viagem } from './viagem';
import { Abastecimento } from '../Abastecimento/abastecimento';

export interface CarteiraViagem {
  viagem: Viagem;
  diesel: {
    total: number;
    itens: Abastecimento[];
  };
}