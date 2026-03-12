// src/services/viagem.service.ts
import { api } from './api';
import { ViagemDocumento } from '../types/Viagem/viagemDocumento';

const ENDPOINT = '/viagens-documentos';

export const ViagemDocumentoService = {
  async buscarTodas(): Promise<ViagemDocumento[]> {
    const response = await api.get<ViagemDocumento[]>(ENDPOINT);
    return response.data;
  },

  async buscarPorId(id: string): Promise<ViagemDocumento> {
    const response = await api.get<ViagemDocumento>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: ViagemDocumento): Promise<ViagemDocumento> {
    const response = await api.post<ViagemDocumento>(ENDPOINT, dados);
    return response.data;
  },

  async atualizar(id: string, dados: Partial<ViagemDocumento>): Promise<ViagemDocumento> {
    const response = await api.put<ViagemDocumento>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
