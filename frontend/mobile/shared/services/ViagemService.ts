// src/services/viagem.service.ts
import { api } from './api';
import { Viagem, ViagemPayload } from '../types/viagem';
import ViagemFiltro from '../types/viagemFiltro';

const ENDPOINT = '/viagens';

export const ViagemService = {
  
  async buscarTodas(filtro: ViagemFiltro): Promise<Viagem[]> {
    const response = await api.get<Viagem[]>(ENDPOINT, { params: filtro });
    console.log(response.data);
    return response.data;
  },

  async buscarPorId(id: string): Promise<Viagem> {
    const response = await api.get<Viagem>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: ViagemPayload): Promise<Viagem> {
    const response = await api.post<Viagem>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<ViagemPayload>): Promise<Viagem> {
    const response = await api.put<Viagem>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
