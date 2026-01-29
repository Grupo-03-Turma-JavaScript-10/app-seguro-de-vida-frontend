import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuscaSeguro } from '../../components/BuscaSeguro/BuscaSeguro';
import { useFiltrosSeguro } from '../../hooks/useFiltrosSeguro';
import { listarSegurosVida } from '../../services/Service';
import { SeguroVida,UsuarioSimplificado } from '../../models/Interfaces';
import { SeguroActions } from '../../components/SeguroActions';
import api from '../../services/api';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Página temporária para testar o componente BuscaSeguro (Mamadou)
 * 
 * @returns {JSX.Element} Página com o componente BuscaSeguro e visualização dos seguros filtrados
 */
export function TesteSeguros() {
  const [seguros, setSeguros] = useState<SeguroVida[]>([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  const fetchSeguros = async () => {
    setCarregando(true);
    try {
      const data = await listarSegurosVida();
      // Mapeia para garantir que cada seguro tenha o campo usuario
      const segurosComUsuario: SeguroVida[] = data.map((seguro: any) => ({
        ...seguro,
        usuario: seguro.usuario || { id: seguro.usuarioId, nome: '' },
        usuarioId: seguro.usuarioId ?? (seguro.usuario ? seguro.usuario.id : undefined),
      }));
      setSeguros(segurosComUsuario);
    } catch (e) {
      setSeguros([]);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchSeguros();
  }, []);

  const {
    filtros,
    segurosFiltrados,
    handleBuscaChange,
    handleFiltrosChange,
    limparFiltros,
  } = useFiltrosSeguro({ seguros });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
            onClick={() => navigate('/planos')}
          >
            Contratar novo plano
          </button>
        </div>
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
          {carregando ? (
            <div className="text-center py-12 text-gray-500">Carregando seguros...</div>
          ) : segurosFiltrados.length === 0 ? (
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {segurosFiltrados.map((seguro) => (
                <div
                  key={seguro.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col h-full"
                >
                  <div className="bg-linear-to-r from-blue-600 to-blue-800 p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">{seguro.tipoSeguro}</h2>
                    <p className="text-sm mb-4 flex items-center gap-1">
                      <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {seguro.usuario.nome}
                    </p>
                    <div className="text-4xl font-bold">
                      R$ {(seguro.valorAssegurado / 1000).toFixed(0)}K
                      <span className="text-lg font-normal ml-1">protegidos</span>
                    </div>
                    <div className="mt-4">
                      <span className="inline-block bg-green-500/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Cobertura ativa
                      </span>
                    </div>
                  </div>
                  <div className="p-1 flex flex-col flex-1">
                            <div className="flex flex-row items-center justify-between w-full px-4 mt-0 h-full min-h-[48px] bg-gray-100 rounded-lg">
                      <SeguroActions
                        seguro={seguro}
                        onAlterado={fetchSeguros}
                        onDeletado={fetchSeguros}
                        buttonClassName="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded transition disabled:opacity-50"
                        deleteButtonClassName="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded transition disabled:opacity-50"
                      />
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

export const atualizarSeguroVida = async (seguro: SeguroVida): Promise<SeguroVida> => {
  const response = await api.put(`/seguros-vida/${seguro.id}`, seguro);
  return response.data;
};