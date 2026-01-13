// src/services/empregadoraService.ts
import { api } from './api';
import { Empregadora } from '../types/empregadora';
import { ComboOption } from '../types/combo';

const ENDPOINT = '/empregadoras';

export const EmpregadoraService = {
  async buscarTodas(): Promise<Empregadora[]> {
    const response = await api.get<Empregadora[]>(ENDPOINT);
    return response.data;
  },

  async buscarCombo(): Promise<ComboOption[]> {
    const response = await api.get<ComboOption[]>(`${ENDPOINT}/combo`);
    return response.data;
  },
  

  async buscarPorId(id: string): Promise<Empregadora> {
    const response = await api.get<Empregadora>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Empregadora): Promise<Empregadora> {
    const response = await api.post<Empregadora>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Empregadora>): Promise<Empregadora> {
    const response = await api.put<Empregadora>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
