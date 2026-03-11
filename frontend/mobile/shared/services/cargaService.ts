// src/services/cargaService.ts
import { api } from './api';
import { Carga } from '../types/carga/carga';
import CargaFiltro from '../types/Carga/cargaFiltro';

const ENDPOINT = '/cargas';

export const CargaService = {
  async buscarTodas(filtro?: CargaFiltro): Promise<Carga[]>{
    const response = await api.get<Carga[]>(ENDPOINT, { params: filtro});
    return response.data;
  },



  async buscarPorId(id: string): Promise<Carga> {
    const response = await api.get<Carga>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: Carga): Promise<Carga> {
    const response = await api.post<Carga>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<Carga>): Promise<Carga> {
    const response = await api.put<Carga>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
