import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function BotaoTeste() {
  return (
    <Link
      to="/testeSeguros"
      className="fixed bottom-6 right-6 z-50 group"
      title="Testar Busca e Filtros de Seguros"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-3 group-hover:scale-110"
      >
        <span className="text-2xl">🧪</span>
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide opacity-90">
            Teste
          </span>
          <span className="text-sm font-bold">
            Busca Seguros
          </span>
        </div>
      </motion.div>
      
      <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Funcionalidade desenvolvida por Mamadou
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </Link>
  );
}