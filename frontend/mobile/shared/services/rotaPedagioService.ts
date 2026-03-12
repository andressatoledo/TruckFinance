// src/services/rotaPedagioService.ts
import { api } from './api';
import { RotaPedagio } from '../types/Rota/rotaPedagio';
import {RotaPedagioFiltro} from '../types/Rota/rotaPedagioFiltro';

const ENDPOINT = '/rota-pedagios';

export const RotaPedagioService = {
  async buscarTodas(filtro?: RotaPedagioFiltro): Promise<RotaPedagio[]> {
    const response = await api.get<RotaPedagio[]>(ENDPOINT, { params: filtro });
    return response.data;
  },

  async buscarPorId(id: string): Promise<RotaPedagio> {
    const response = await api.get<RotaPedagio>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: RotaPedagio): Promise<RotaPedagio> {
    const response = await api.post<RotaPedagio>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<RotaPedagio>): Promise<RotaPedagio> {
    const response = await api.put<RotaPedagio>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
