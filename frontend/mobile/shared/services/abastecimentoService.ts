// src/services/AbastecimentoService.ts
import { api } from './api';
import { Abastecimento } from '../types/Abastecimento/abastecimento';
import { ComboOption } from '../types/Outros/combo';
import type AbastecimentoFiltro from '../types/Abastecimento/abastecimentoFiltro';

const ENDPOINT = '/abastecimentos';

export const AbastecimentoService = {
  async buscarTodas(filtro?: AbastecimentoFiltro): Promise<Abastecimento[]> {
    const response = await api.get<Abastecimento[]>(ENDPOINT, { params: filtro});
    return response.data;
  },

  async buscarCombo(): Promise<ComboOption[]> {
      const response = await api.get<ComboOption[]>(`${ENDPOINT}/combo`);
      return response.data;
  },

  async buscarPorId(id: string): Promise<Abastecimento> {
    const response = await api.get<Abastecimento>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Abastecimento): Promise<Abastecimento> {
    const response = await api.post<Abastecimento>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Abastecimento>): Promise<Abastecimento> {
    const response = await api.put<Abastecimento>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
