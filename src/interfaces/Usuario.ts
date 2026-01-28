import { CreateEnderecoDto } from './CreateEnderecoDto';
import { CreateContatoEmergenciaDto } from './CreateContatoEmergenciaDto';

export interface Usuario {
  id: number;
  nome: string;
  dataNascimento: string;
  cpf: string;
  email: string;
  rendaMensal: number;
  endereco: CreateEnderecoDto;
  contatoEmergencia?: CreateContatoEmergenciaDto;
}
