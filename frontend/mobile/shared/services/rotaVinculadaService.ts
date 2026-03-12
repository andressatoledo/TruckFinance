// src/services/rotaVinculadaService.ts
import { api } from './api';
import { RotaVinculada } from '../types/Rota/rotaVinculada';
import { ComboOption } from '../types/Outros/combo';
import {RotaVinculadaFiltro} from '../types/Rota/rotaVinculadaFiltro';

const ENDPOINT = '/rotas-vinculadas';
console.log('api',api);
export const RotaVinculadaService = {
  async buscarTodas(filtro?: RotaVinculadaFiltro): Promise<RotaVinculada[]> {
    const response = await api.get<RotaVinculada[]>(ENDPOINT, { params: filtro });
    return response.data;
  },

  async buscarCombo(): Promise<ComboOption[]> {
    const response = await api.get<ComboOption[]>(`${ENDPOINT}/combo`);
    return response.data;
  },

  async buscarPorId(id: string): Promise<RotaVinculada> {
    const response = await api.get<RotaVinculada>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: RotaVinculada): Promise<RotaVinculada> {
    const response = await api.post<RotaVinculada>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<RotaVinculada>): Promise<RotaVinculada> {
    const response = await api.put<RotaVinculada>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
