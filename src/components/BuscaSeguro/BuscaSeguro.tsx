import React from 'react';
import { FiltrosSeguro } from '../../models/Interfaces';

interface BuscaSeguroProps {
  filtros: FiltrosSeguro;
  totalResultados: number;
  onBuscaChange: (valor: string) => void;
  onFiltrosChange: (filtros: Partial<FiltrosSeguro>) => void;
  onLimparFiltros: () => void;
}

export function BuscaSeguro({
  filtros,
  totalResultados,
  onBuscaChange,
  onFiltrosChange,
  onLimparFiltros,
}: BuscaSeguroProps) {
  
  const handleBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onBuscaChange(e.target.value);
  };

  const handleLimparBusca = () => {
    onBuscaChange('');
  };

  const handleValorMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltrosChange({ valorMin: Number(e.target.value) || 0 });
  };

  const handleValorMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltrosChange({ valorMax: Number(e.target.value) || 0 });
  };

  const handleOrdenacaoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltrosChange({ ordenacao: e.target.value as FiltrosSeguro['ordenacao'] });
  };

  return (
    <div className="space-y-6">
      {/* ========== CAMPO DE BUSCA PRINCIPAL ========== */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="relative">
          {/* Ícone de Busca */}
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Input de Busca */}
          <input
            type="text"
            className="w-full pl-12 pr-12 py-4 text-base border-2 border-gray-200 rounded-lg
                       focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                       transition-all duration-200"
            value={filtros.busca}
            onChange={handleBuscaChange}
            placeholder="Buscar seguros por tipo ou nome do usuário..."
            aria-label="Campo de busca de seguros"
          />

          {/* Botão Limpar Busca (só aparece quando tem texto) */}
          {filtros.busca && (
            <button
              onClick={handleLimparBusca}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 
                         text-gray-400 hover:text-gray-600 hover:bg-gray-100 
                         rounded-full transition-all duration-200"
              aria-label="Limpar busca"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Contador de Resultados */}
        <div className="mt-4 flex items-center justify-between text-sm flex-wrap gap-2">
          <span className="text-gray-600">
            <strong className="text-gray-900 font-semibold">{totalResultados}</strong>{' '}
            {totalResultados === 1 ? 'seguro encontrado' : 'seguros encontrados'}
            {filtros.busca && (
              <span className="ml-1">
                para "<strong className="text-blue-600">{filtros.busca}</strong>"
              </span>
            )}
          </span>
          <button
            onClick={onLimparFiltros}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Limpar todos os filtros
          </button>
        </div>
      </div>

      {/* ========== PAINEL DE FILTROS AVANÇADOS ========== */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Filtros Avançados</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Filtro: Valor Mínimo */}
          <div>
            <label htmlFor="valor-min" className="block text-sm font-medium text-gray-700 mb-2">
              Valor Assegurado Mínimo
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                R$
              </span>
              <input
                id="valor-min"
                type="number"
                placeholder="0"
                value={filtros.valorMin || ''}
                onChange={handleValorMinChange}
                min="0"
                step="1000"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg
                           focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100
                           transition-all duration-200"
              />
            </div>
          </div>

          {/* Filtro: Valor Máximo */}
          <div>
            <label htmlFor="valor-max" className="block text-sm font-medium text-gray-700 mb-2">
              Valor Assegurado Máximo
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                R$
              </span>
              <input
                id="valor-max"
                type="number"
                placeholder="0"
                value={filtros.valorMax || ''}
                onChange={handleValorMaxChange}
                min="0"
                step="1000"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg
                           focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100
                           transition-all duration-200"
              />
            </div>
          </div>

          {/* Filtro: Ordenação */}
          <div>
            <label htmlFor="ordenacao" className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select
              id="ordenacao"
              value={filtros.ordenacao}
              onChange={handleOrdenacaoChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg bg-white
                         focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100
                         transition-all duration-200 cursor-pointer"
            >
              <option value="valorCrescente">Menor Valor</option>
              <option value="valorDecrescente">Maior Valor</option>
              <option value="nomeAZ">Nome: A → Z</option>
              <option value="nomeZA">Nome: Z → A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}