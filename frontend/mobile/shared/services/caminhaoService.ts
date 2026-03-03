// src/services/CaminhaoService.ts
import { api } from './api';
import { Caminhao } from '../types/Caminhao/caminhao';
import { ComboOption } from '../types/combo';
import CaminhaoFiltro from '../types/Caminhao/caminhaoFiltro';

const ENDPOINT = '/caminhoes';

export const CaminhaoService = {
    async buscarTodas(filtro?: CaminhaoFiltro): Promise<Caminhao[]> {
      const response = await api.get<Caminhao[]>(ENDPOINT, { params: filtro});
      console.log('buscar',response.data);
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
