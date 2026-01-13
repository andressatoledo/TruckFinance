// src/services/rotaService.ts
import { api } from './api';
import { Rota } from '../types/rota';

const ENDPOINT = '/rotas';

export const RotaService = {
  async buscarTodas(): Promise<Rota[]> {
    const response = await api.get<Rota[]>(ENDPOINT);
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
