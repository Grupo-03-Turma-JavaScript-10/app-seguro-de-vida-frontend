import { useState, useEffect } from 'react';
import { BuscaSeguro } from '../../components/BuscaSeguro/BuscaSeguro';
import { useFiltrosSeguro } from '../../hooks/useFiltrosSeguro';
import { SeguroVida } from '../../models/Interfaces';
import { listarSegurosVida } from '../../services/Service';

export function Seguros() {
  const [seguros, setSeguros] = useState<SeguroVida[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Buscar seguros do backend
  useEffect(() => {
    async function carregarSeguros() {
      try {
        setLoading(true);
        setErro(null);
        const dados = await listarSegurosVida();
        setSeguros(dados);
      } catch (error) {
        console.error('Erro ao carregar seguros:', error);
        setErro('Não foi possível carregar os seguros. Verifique se o backend está rodando na porta 4000.');
      } finally {
        setLoading(false);
      }
    }

    carregarSeguros();
  }, []);

  // Hook de filtragem
  const {
    filtros,
    segurosFiltrados,
    handleBuscaChange,
    handleFiltrosChange,
    limparFiltros,
  } = useFiltrosSeguro({ seguros });

  // Estado de loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Carregando seguros...</p>
        </div>
      </div>
    );
  }

  // Estado de erro
  if (erro) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 max-w-md text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-red-800 font-bold text-xl mb-3">Erro ao Carregar Seguros</h2>
          <p className="text-red-600 text-sm mb-6">{erro}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  // Calcular estatísticas
  const totalValorAssegurado = segurosFiltrados.reduce(
    (acc, s) => acc + s.valorAssegurado,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
             Seguros de Vida
          </h1>
          <p className="text-gray-600 text-lg">
            Busque e filtre os seguros cadastrados no sistema
          </p>
        </div>

        {/* Componente de Busca e Filtros */}
        <BuscaSeguro
          filtros={filtros}
          totalResultados={segurosFiltrados.length}
          onBuscaChange={handleBuscaChange}
          onFiltrosChange={handleFiltrosChange}
          onLimparFiltros={limparFiltros}
        />

        {/* Estatísticas */}
        {segurosFiltrados.length > 0 && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Total de Seguros</p>
                <p className="text-3xl font-bold text-blue-600">{segurosFiltrados.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Valor Total Assegurado</p>
                <p className="text-3xl font-bold text-green-600">
                  R$ {totalValorAssegurado.toLocaleString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Valor Médio</p>
                <p className="text-3xl font-bold text-purple-600">
                  R$ {Math.round(totalValorAssegurado / segurosFiltrados.length).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Resultados */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Resultados
            </h2>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
              {segurosFiltrados.length} {segurosFiltrados.length === 1 ? 'seguro' : 'seguros'}
            </span>
          </div>

          {segurosFiltrados.length === 0 ? (
            <div className="text-center py-16">
              <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 text-xl font-medium mb-2">Nenhum seguro encontrado</p>
              <p className="text-gray-400 text-sm mb-6">Tente ajustar seus filtros de busca</p>
              <button
                onClick={limparFiltros}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {segurosFiltrados.map((seguro) => (
                <div
                  key={seguro.id}
                  className="group relative p-6 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50"
                >
                  {/* Badge ID */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-bold">
                      #{seguro.id}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 pr-12 group-hover:text-blue-600 transition-colors">
                      {seguro.tipoSeguro}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm font-medium">{seguro.usuario.nome}</span>
                    </div>
                  </div>

                  {/* Valor */}
                  <div className="pt-4 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        Valor Assegurado
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        R$ {seguro.valorAssegurado.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}