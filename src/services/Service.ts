import axios from 'axios';
import { CreateUsuarioDto } from '../interfaces/CreateUsuarioDto';
import { Usuario } from '../interfaces/Usuario';
import { CreateSeguroVidaDto } from '../interfaces/CreateSeguroVidaDto';
import { SeguroVida } from '../interfaces/SeguroVida';

const api = axios.create({
  baseURL: 'https://segura-vida.onrender.com'
});

// Atualizar seguro de vida
export const atualizarSeguroVida = async (seguro: SeguroVida): Promise<SeguroVida> => {
  const response = await api.put('/seguros-vida', seguro);
  return response.data;
};

// Deletar seguro de vida
export const deletarSeguroVida = async (id: number): Promise<void> => {
  await api.delete(`/seguros-vida/${id}`);
};

// Listar todos os usuários
export const listarUsuarios = async (): Promise<Usuario[]> => {
  const response = await api.get('/usuarios');
  return response.data;
};

// Buscar usuário por ID
export const buscarUsuarioPorId = async (id: number): Promise<Usuario> => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};

// Buscar usuário por nome
export const buscarUsuarioPorNome = async (nome: string): Promise<Usuario[]> => {
  const response = await api.get(`/usuarios/nome/${nome}`);
  return response.data;
};

// Criar novo usuário
export const cadastrarUsuario = async (usuario: CreateUsuarioDto): Promise<Usuario> => {
  const response = await api.post('/usuarios', usuario);
  return response.data;
};

// Atualizar usuário
export const atualizarUsuario = async (usuario: Usuario): Promise<Usuario> => {
  const response = await api.put('/usuarios', usuario);
  return response.data;
};

// Deletar usuário
export const deletarUsuario = async (id: number): Promise<void> => {
  await api.delete(`/usuarios/${id}`);
};

// ===== SEGURO DE VIDA =====

// Criar novo seguro de vida
export const cadastrarSeguroVida = async (seguro: CreateSeguroVidaDto): Promise<SeguroVida> => {
  const response = await api.post('/seguros-vida', seguro);
  return response.data;
};

// Listar todos os seguros de vida
export const listarSegurosVida = async (): Promise<SeguroVida[]> => {
  const response = await api.get('/seguros-vida');
  return response.data;
};

// Buscar seguro de vida por ID
export const buscarSeguroVidaPorId = async (id: number): Promise<SeguroVida> => {
  const response = await api.get(`/seguros-vida/${id}`);
  return response.data;
};

export default api;
