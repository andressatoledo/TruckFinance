// src/services/manutencaoService.ts
import { api } from './api';
import { Manutencao } from '../types/manutencao';

const ENDPOINT = '/manutencoes';

export const ManutencaoService = {
  async buscarTodas(): Promise<Manutencao[]> {
    const response = await api.get<Manutencao[]>(ENDPOINT);
    return response.data;
  },

  async buscarPorId(id: string): Promise<Manutencao> {
    const response = await api.get<Manutencao>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Manutencao): Promise<Manutencao> {
    const response = await api.post<Manutencao>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Manutencao>): Promise<Manutencao> {
    const response = await api.put<Manutencao>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
