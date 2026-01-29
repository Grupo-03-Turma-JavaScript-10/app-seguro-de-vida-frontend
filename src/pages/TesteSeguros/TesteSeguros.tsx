import { BuscaSeguro } from '../../components/BuscaSeguro/BuscaSeguro';
import { useFiltrosSeguro } from '../../hooks/useFiltrosSeguro';
import { segurosMock } from '../../mocks/segurosMock';

export function TesteSeguros() {
  const {
    filtros,
    segurosFiltrados,
    handleBuscaChange,
    handleFiltrosChange,
    limparFiltros,
  } = useFiltrosSeguro({ seguros: segurosMock });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🛡️ Teste: Busca e Filtros de Seguros de Vida
          </h1>
          <p className="text-gray-600">
            Página temporária para testar o componente BuscaSeguro (Mamadou)
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

        {/* Visualização dos Resultados */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Seguros Filtrados ({segurosFiltrados.length})
          </h2>

          {segurosFiltrados.length === 0 ? (
            // Estado vazio
            <div className="text-center py-12">
              <svg 
                className="mx-auto h-12 w-12 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              <p className="mt-2 text-gray-500 text-lg">Nenhum seguro encontrado</p>
              <p className="text-sm text-gray-400">Tente ajustar seus filtros</p>
            </div>
          ) : (
            // Grid de seguros
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {segurosFiltrados.map((seguro) => (
                <div 
                  key={seguro.id} 
                  className="p-5 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 
                             bg-gradient-to-br from-white to-blue-50"
                >
                  {/* Header do Card */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {seguro.tipoSeguro}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {seguro.usuario.nome}
                      </p>
                    </div>
                    <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs rounded-full font-medium">
                      #{seguro.id}
                    </span>
                  </div>

                  {/* Valor */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        Valor Assegurado
                      </span>
                      <span className="text-xl font-bold text-green-600">
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