import { SeguroVida } from '../../interfaces/SeguroVida';

interface PainelPlanoSelecionadoProps {
  plano: SeguroVida;
}

export default function PainelPlanoSelecionado({ plano }: PainelPlanoSelecionadoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-2">Plano Selecionado</h2>
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
        <p className="text-lg font-bold text-blue-900">{plano.tipoSeguro}</p>
        <p className="text-blue-800">
          Cobertura: R$ {(plano.valorAssegurado / 1000).toFixed(0)}K
        </p>
      </div>
    </div>
  );
}
