import api from './api';
import { SeguroVida } from '../models/Interfaces';

/**
 * Service para operações com Seguros de Vida
 * Integração com backend NestJS
 */
export const seguroService = {
  /**
   * Lista todos os seguros de vida
   * Endpoint: GET /segurovida
   */
  listarTodos: async (): Promise<SeguroVida[]> => {
    try {
      const response = await api.get<SeguroVida[]>('/segurovida');
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao listar seguros:', error);
      throw new Error('Falha ao carregar seguros. Verifique se o backend está rodando na porta 4000.');
    }
  },

  /**
   * Busca um seguro específico por ID
   * Endpoint: GET /segurovida/:id
   */
  buscarPorId: async (id: number): Promise<SeguroVida> => {
    try {
      const response = await api.get<SeguroVida>(`/segurovida/${id}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao buscar seguro ${id}:`, error);
      throw new Error('Seguro não encontrado.');
    }
  },
};