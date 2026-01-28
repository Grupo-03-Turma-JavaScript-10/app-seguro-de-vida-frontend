import { SeguroVida } from '../../interfaces/SeguroVida';

interface ListaPlanosProps {
  planos: SeguroVida[];
  carregando: boolean;
  onSelecionarPlano: (plano: SeguroVida) => void;
}

export default function ListaPlanos({ planos, carregando, onSelecionarPlano }: ListaPlanosProps) {
  const getDescricaoPlano = (tipoSeguro: string): string => {
    const descricoes: Record<string, string> = {
      'Plano Básico': 'Plano ideal para quem busca proteção básica',
      'Plano Intermediário': 'Plano com melhor custo-benefício',
      'Plano Premium': 'Plano com cobertura completa'
    };
    return descricoes[tipoSeguro] || 'Plano de seguro de vida';
  };

  const getCoberturaPlano = (tipoSeguro: string): string[] => {
    const coberturas: Record<string, string[]> = {
      'Plano Básico': ['Cobertura por morte natural', 'Cobertura por acidente', 'Indenização até R$ 50.000'],
      'Plano Intermediário': ['Cobertura por morte natural', 'Cobertura por acidente', 'Cobertura por invalidez', 'Indenização até R$ 150.000'],
      'Plano Premium': ['Cobertura por morte natural', 'Cobertura por acidente', 'Cobertura por invalidez', 'Assistência funeral', 'Indenização até R$ 500.000']
    };
    return coberturas[tipoSeguro] || ['Cobertura padrão'];
  };

  if (carregando) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Carregando planos...</p>
      </div>
    );
  }

  if (planos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Nenhum plano disponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-2 text-center">Nossos Planos</h1>
      <p className="text-gray-600 text-center mb-12">Escolha o plano perfeito para você e sua família</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {planos.map((plano) => (
          <div key={plano.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{plano.tipoSeguro}</h2>
              <p className="text-sm mb-4">{getDescricaoPlano(plano.tipoSeguro)}</p>
              <div className="text-4xl font-bold">
                R$ {(plano.valorAssegurado / 1000).toFixed(0)}K
                <span className="text-lg font-normal"> cobertura</span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-bold mb-4 text-gray-800">O que está incluído:</h3>
              <ul className="mb-6 space-y-2">
                {getCoberturaPlano(plano.tipoSeguro).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => onSelecionarPlano(plano)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
              >
                Escolher este Plano
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
