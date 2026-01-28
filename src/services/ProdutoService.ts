import api from './api';
import { Produto } from '../models/Interfaces';

export const ProdutoService = {
  getProdutos: async (): Promise<Produto[]> => {
    const response = await api.get<Produto[]>('/seguros-vida');
    return response.data;
  },

  deleteProduto: async (id: number): Promise<void> => {
    await api.delete(`/seguros-vida/${id}`);
  },
};
