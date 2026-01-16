import { Viagem } from './viagem';
import { Abastecimento } from './abastecimento';

export interface CarteiraViagem {
  viagem: Viagem;
  diesel: {
    total: number;
    itens: Abastecimento[];
  };
}