import { SeguroVida } from '../models/Interfaces';

/**
 * Mocks de seguros de vida para testes
 */
export const segurosMock: SeguroVida[] = [
  {
    id: 1,
    tipoSeguro: 'Vida Individual Premium',
    valorAssegurado: 100000,
    usuario: { id: 1, nome: 'João Silva' },
    usuarioId: 0
  },
  {
    id: 2,
    tipoSeguro: 'Vida Individual Básico',
    valorAssegurado: 50000,
    usuario: { id: 2, nome: 'Maria Santos' },
    usuarioId: 0
  },
  {
    id: 3,
    tipoSeguro: 'Vida Familiar Completo',
    valorAssegurado: 250000,
    usuario: { id: 3, nome: 'Pedro Oliveira' },
    usuarioId: 0
  },
  {
    id: 4,
    tipoSeguro: 'Vida Familiar Essencial',
    valorAssegurado: 150000,
    usuario: { id: 4, nome: 'Ana Costa' },
    usuarioId: 0
  },
  {
    id: 5,
    tipoSeguro: 'Vida Empresarial Gold',
    valorAssegurado: 500000,
    usuario: { id: 5, nome: 'Carlos Mendes' },
    usuarioId: 0
  },
  {
    id: 6,
    tipoSeguro: 'Vida Individual Plus',
    valorAssegurado: 75000,
    usuario: { id: 6, nome: 'Fernanda Lima' },
    usuarioId: 0
  },
  {
    id: 7,
    tipoSeguro: 'Vida Familiar Premium',
    valorAssegurado: 300000,
    usuario: { id: 7, nome: 'Ricardo Alves' },
    usuarioId: 0
  },
  {
    id: 8,
    tipoSeguro: 'Vida Empresarial Básico',
    valorAssegurado: 200000,
    usuario: { id: 8, nome: 'Juliana Rocha' },
    usuarioId: 0
  },
  {
    id: 9,
    tipoSeguro: 'Vida Individual Standard',
    valorAssegurado: 60000,
    usuario: { id: 9, nome: 'Roberto Dias' },
    usuarioId: 0
  },
  {
    id: 10,
    tipoSeguro: 'Vida Familiar Master',
    valorAssegurado: 400000,
    usuario: { id: 10, nome: 'Beatriz Souza' },
    usuarioId: 0
  },
];