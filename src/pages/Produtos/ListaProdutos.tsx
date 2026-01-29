import { useEffect, useState } from 'react';
import { Produto } from '../../models/Interfaces';
import { ProdutoService } from '../../services/ProdutoService';
import { CardProduto } from '../../components/CardProduto';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

export function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Carregando produtos...');
      const data = await ProdutoService.getProdutos();
      console.log('✅ Produtos carregados:', data);
      setProdutos(data);
    } catch (err: any) {
      console.error('❌ Erro completo:', err);
      console.error('❌ Response:', err.response);
      console.error('❌ Message:', err.message);
      
      let errorMessage = 'Erro ao carregar produtos.';
      
      if (err.response) {
        // O servidor respondeu com erro
        errorMessage = `Erro ${err.response.status}: ${err.response.data?.message || 'Erro no servidor'}`;
      } else if (err.request) {
        // Requisição foi feita mas não houve resposta (CORS, rede, etc)
        errorMessage = 'Não foi possível conectar ao backend. Verifique CORS ou se o backend está online.';
      } else {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    try {
      await ProdutoService.deleteProduto(id);
      setProdutos(produtos.filter((produto) => produto.id !== id));
      toast.success('Produto excluído com sucesso!');
    } catch (err) {
      toast.error('Erro ao excluir produto');
      console.error('Erro ao excluir produto:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
        <p className="text-gray-600 mt-2">
          Gerencie os produtos de seguro de vida
        </p>
      </div>

      {produtos.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg">
            Nenhum produto cadastrado ainda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <CardProduto
              key={produto.id}
              produto={produto}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
