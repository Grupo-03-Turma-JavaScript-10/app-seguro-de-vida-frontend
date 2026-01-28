import { Produto } from '../models/Interfaces';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

interface CardProdutoProps {
  produto: Produto;
  onDelete: (id: number) => void;
}

export function CardProduto({ produto, onDelete }: CardProdutoProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">
            Seguro #{produto.id}
          </h3>
          <Button
            size="sm"
            onClick={() => onDelete(produto.id)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Trash2 className="w-4 h-4" />
            Excluir
          </Button>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Tipo de Seguro:</span>
            <span className="font-medium text-gray-900">{produto.tipoSeguro}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Valor Assegurado:</span>
            <span className="font-medium text-gray-900">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(produto.valorAssegurado)}
            </span>
          </div>

          {produto.usuario && (
            <div className="flex justify-between">
              <span className="text-gray-600">Usuário:</span>
              <span className="font-medium text-gray-900">{produto.usuario.nome}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
