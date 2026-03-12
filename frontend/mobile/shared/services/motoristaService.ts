import { api } from './api';
import { Motorista } from '../types/Motorista/motorista';
import { ComboOption } from '../types/Outros/combo';
import {MotoristaFiltro} from '../types/Motorista/motoristaFiltro';

const ENDPOINT = '/motoristas';

export const MotoristaService = {
  async buscarTodas(filtro?: MotoristaFiltro): Promise<Motorista[]> {
    const response = await api.get<Motorista[]>(ENDPOINT, { params: filtro });
    return response.data;
  },

  async buscarCombo(): Promise<ComboOption[]> {
    console.log('Chamando endpoint:', `${api}${ENDPOINT}/combo`);
    const response = await api.get<ComboOption[]>(`${ENDPOINT}/combo`);
    console.log('response combo motorista', response.data);
    return response.data;
  },


  async buscarPorId(id: string): Promise<Motorista> {
    const response = await api.get<Motorista>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Motorista): Promise<Motorista> {
    const response = await api.post<Motorista>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Motorista>): Promise<Motorista> {
    const response = await api.put<Motorista>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
