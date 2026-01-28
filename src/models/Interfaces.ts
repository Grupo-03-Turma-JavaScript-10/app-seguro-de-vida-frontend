export interface Usuario {
  id: number;
  nome: string;
  dataNascimento: string;
  cpf: string;
  email: string;
  rendaMensal: number;
}

export interface Produto {
  id: number;
  valorAssegurado: number;
  tipoSeguro: string;
  usuario?: Usuario;
}
