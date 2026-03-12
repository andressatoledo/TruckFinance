// src/services/rotaService.ts
import { api } from './api';
import { Rota } from '../types/Rota/rota';
import {RotaFiltro} from '../types/Rota/rotaFiltro';

const ENDPOINT = '/rotas';

export const RotaService = {
  async buscarTodas(filtro?: RotaFiltro): Promise<Rota[]> {
    const response = await api.get<Rota[]>(ENDPOINT, { params: filtro });
    return response.data;
  },

  async buscarPorId(id: string): Promise<Rota> {
    const response = await api.get<Rota>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Rota): Promise<Rota> {
    const response = await api.post<Rota>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Rota>): Promise<Rota> {
    const response = await api.put<Rota>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
