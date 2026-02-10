// src/services/pedagioValorService.ts
import { api } from './api';
import { PedagioValor } from '../types/pedagioValor';
import { PedagioValorFiltro } from '../types/pedagioValorFiltro';

const ENDPOINT = '/pedagio-valores';

export const PedagioValorService = {
  async buscarTodas(filtro?: PedagioValorFiltro): Promise<PedagioValor[]> {
    const response = await api.get<PedagioValor[]>(ENDPOINT, {
      params: filtro,
    });
    return response.data;
  },

  async buscarPorId(id: string): Promise<PedagioValor> {
    const response = await api.get<PedagioValor>(`${ENDPOINT}/${id}`);
    return response.data;
  },

  async criar(dados: PedagioValor[]): Promise<PedagioValor[]> {
    const response = await api.post<PedagioValor[]>(ENDPOINT, dados);
    return response.data;
  },

  async criarValores(
    pedagioId: string,
    dados: PedagioValor[],
  ): Promise<PedagioValor[]> {
    

    const data = dados.map(v => ({
      ...v,
      pedagioId: pedagioId,
    }));

    const payload = {
      pedagioId: pedagioId,
      data: data,
    };

    const response = await api.post<PedagioValor[]>(
      `${ENDPOINT}/grid`,
      payload,
    );
    return response.data;
  },

  async atualizar(
    id: string,
    dados: Partial<PedagioValor>,
  ): Promise<PedagioValor> {
    const response = await api.put<PedagioValor>(`${ENDPOINT}/${id}`, dados);
    return response.data;
  },

  async excluir(id: string): Promise<void> {
    await api.delete(`${ENDPOINT}/${id}`);
  },
};
