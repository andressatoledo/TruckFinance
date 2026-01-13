// src/services/pedagioService.ts
import { api } from './api';
import { Pedagio } from '../types/pedagio';

const ENDPOINT = '/pedagios';

export const PedagioService = {
  async buscarTodas(): Promise<Pedagio[]> {
    const response = await api.get<Pedagio[]>(ENDPOINT);
    return response.data;
  },

  async buscarPorId(id: string): Promise<Pedagio> {
    const response = await api.get<Pedagio>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Pedagio): Promise<Pedagio> {
    const response = await api.post<Pedagio>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Pedagio>): Promise<Pedagio> {
    const response = await api.put<Pedagio>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
