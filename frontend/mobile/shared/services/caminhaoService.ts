// src/services/CaminhaoService.ts
import { api } from './api';
import { Caminhao } from '../types/caminhao';
import { ComboOption } from '../types/combo';

const ENDPOINT = '/caminhoes';

export const CaminhaoService = {
  async buscarTodas(): Promise<Caminhao[]> {
    const response = await api.get<Caminhao[]>(ENDPOINT);
    return response.data;
  },

  async buscarCombo(): Promise<ComboOption[]> {
      const response = await api.get<ComboOption[]>(`${ENDPOINT}/combo`);
      return response.data;
  },

  async buscarPorId(id: string): Promise<Caminhao> {
    const response = await api.get<Caminhao>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Caminhao): Promise<Caminhao> {
    const response = await api.post<Caminhao>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Caminhao>): Promise<Caminhao> {
    const response = await api.put<Caminhao>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
