import { SeguroVida } from '../../interfaces/SeguroVida';
import { motion } from 'framer-motion';

interface ListaPlanosProps {
  planos: SeguroVida[];
  carregando: boolean;
  onSelecionarPlano: (plano: SeguroVida) => void;
}

export default function ListaPlanos({ planos, carregando, onSelecionarPlano }: ListaPlanosProps) {
    if (carregando) {
      return (
        <div className="flex flex-col items-center justify-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      );
    }
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


  if (planos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Nenhum plano disponível no momento.</p>
      </div>
    );
  }

  return (
    <section className="relative bg-[#020e27] text-white pt-0 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[calc(100vh-5rem)]">
      {/* Hero-style background gradients */}
      <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#bae8b0] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2a4365] rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 mt-16"
        >
          Nossos Planos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-[#bae8b0] max-w-2xl mb-10 font-bold"
        >
          Escolha o plano perfeito para você e sua família
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {planos.map((plano) => (
            <div key={plano.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col h-full">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">{plano.tipoSeguro}</h2>
                <p className="text-sm mb-4">{getDescricaoPlano(plano.tipoSeguro)}</p>
                <div className="text-4xl font-bold">
                  R$ {(plano.valorAssegurado / 1000).toFixed(0)}K
                  <span className="text-lg font-normal"> cobertura</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold mb-4 text-gray-800">O que está incluído:</h3>
                <ul className="mb-6 space-y-2 flex-1">
                  {getCoberturaPlano(plano.tipoSeguro).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onSelecionarPlano(plano)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition mt-auto"
                >
                  Escolher este Plano
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
