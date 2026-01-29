// Interface para Endereço
export interface Endereco {
  id: number;
  rua: string;
  numero: string;
  cidade: string;
  cep: string;
}

// Interface para Contato de Emergência
export interface ContatoEmergencia {
  id: number;
  nome: string;
  telefone: string;
  grauParentesco: string;
}

// Interface para Usuário (completo)
export interface Usuario {
  id: number;
  nome: string;
  dataNascimento: number;
  cpf: string;
  email: string;
  rendaMensal: number;
  endereco: Endereco;
  contatoEmergencia: ContatoEmergencia;
}

// Interface simplificada (quando vem no seguro)
export interface UsuarioSimplificado {
  id: number;
  nome: string;
}

// Interface para Seguro de Vida (PRINCIPAL)
export interface SeguroVida {
  id: number;
  valorAssegurado: number;
  tipoSeguro: string;
  usuario: UsuarioSimplificado;
  usuarioId: number;
}

// Interface para Filtros 
export interface FiltrosSeguro {
  busca: string;
  valorMin: number;
  valorMax: number;
  ordenacao: 'valorCrescente' | 'valorDecrescente' | 'nomeAZ' | 'nomeZA';
}