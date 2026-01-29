import { useNavigate } from 'react-router-dom';

export function BotaoTeste() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/TesteSeguros');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-green-400 hover:bg-green-500 text-gray-900 
                 px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl 
                 hover:scale-105 transition-all duration-300 
                 flex items-center gap-3 font-semibold z-50"
      aria-label="Testar Busca de Seguros"
    >
      {/* Ícone de Escudo/Proteção */}
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
        />
      </svg>
      
      <div className="flex flex-col items-start">
        <span className="text-xs uppercase tracking-wide opacity-80"></span>
        <span className="text-sm font-bold">Busca Seguros</span>
      </div>
    </button>
  );
}