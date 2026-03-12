// src/services/carretaService.ts
import { api } from './api';
import { Carreta } from '../types/Carreta/carreta';
import { ComboOption } from '../types/Outros/combo';
import CarretaFiltro from '../types/Carreta/carretaFiltro';

const ENDPOINT = '/carretas';

export const CarretaService = {

  async buscarTodas(filtro?: CarretaFiltro): Promise<Carreta[]> {
    console.log('Buscando carretas com filtro:', filtro);
    const response = await api.get<Carreta[]>(ENDPOINT, { params: filtro });
    return response.data;
  },

  async buscarCombo(): Promise<ComboOption[]> {
      const response = await api.get<ComboOption[]>(`${ENDPOINT}/combo`);
      return response.data;
  },

  async buscarPorId(id: string): Promise<Carreta> {
    const response = await api.get<Carreta>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Carreta): Promise<Carreta> {
    const response = await api.post<Carreta>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Carreta>): Promise<Carreta> {
    const response = await api.put<Carreta>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
