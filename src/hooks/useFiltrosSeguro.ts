import { useState, useMemo } from 'react';
import { FiltrosSeguro, SeguroVida } from '../models/Interfaces';

interface UseFiltrosSeguroProps {
  seguros: SeguroVida[];
}

/**
 * Hook customizado para gerenciar filtros de seguros
 */
export function useFiltrosSeguro({ seguros }: UseFiltrosSeguroProps) {
  const [filtros, setFiltros] = useState<FiltrosSeguro>({
    busca: '',
    valorMin: 0,
    valorMax: 0,
    ordenacao: 'valorCrescente',
  });

  // Aplicar filtros com useMemo (performance)
  const segurosFiltrados = useMemo(() => {
    let resultado = [...seguros];

    // FILTRO 1: Busca por tipo de seguro ou nome do usuário
    if (filtros.busca.trim()) {
      const buscaLower = filtros.busca.toLowerCase().trim();
      resultado = resultado.filter(
        (seguro) =>
          seguro.tipoSeguro.toLowerCase().includes(buscaLower) ||
          seguro.usuario.nome.toLowerCase().includes(buscaLower)
      );
    }

    // FILTRO 2: Valor mínimo
    if (filtros.valorMin > 0) {
      resultado = resultado.filter(
        (seguro) => seguro.valorAssegurado >= filtros.valorMin
      );
    }

    // FILTRO 3: Valor máximo
    if (filtros.valorMax > 0) {
      resultado = resultado.filter(
        (seguro) => seguro.valorAssegurado <= filtros.valorMax
      );
    }

    // ORDENAÇÃO
    resultado.sort((a, b) => {
      switch (filtros.ordenacao) {
        case 'valorCrescente':
          return a.valorAssegurado - b.valorAssegurado;
        case 'valorDecrescente':
          return b.valorAssegurado - a.valorAssegurado;
        case 'nomeAZ':
          return a.usuario.nome.localeCompare(b.usuario.nome);
        case 'nomeZA':
          return b.usuario.nome.localeCompare(a.usuario.nome);
        default:
          return 0;
      }
    });

    return resultado;
  }, [seguros, filtros]);

  // Funções de controle
  const handleBuscaChange = (valor: string) => {
    setFiltros((prev) => ({ ...prev, busca: valor }));
  };

  const handleFiltrosChange = (novosFiltros: Partial<FiltrosSeguro>) => {
    setFiltros((prev) => ({ ...prev, ...novosFiltros }));
  };

  const limparFiltros = () => {
    setFiltros({
      busca: '',
      valorMin: 0,
      valorMax: 0,
      ordenacao: 'valorCrescente',
    });
  };

  return {
    filtros,
    segurosFiltrados,
    handleBuscaChange,
    handleFiltrosChange,
    limparFiltros,
  };
}