import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Users, TrendingUp, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BotaoTeste } from "../components/BotaoTeste/BotaoTeste";

export function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      {/* Hero Section */}
      <section className="relative bg-[#020e27] text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           {/* Abstract background pattern could go here */}
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#bae8b0] rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2a4365] rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            Proteção para você,<br />
            <span className="text-[#bae8b0]">Tranquilidade para todos.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#cccace] max-w-2xl mb-10"
          >
            Descubra planos de seguro de vida e saúde desenhados para o seu momento de vida.
            Segurança, confiança e evolução ao seu lado.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to="/planos" 
              className="px-8 py-3 bg-[#bae8b0] text-[#020e27] font-bold rounded-full hover:bg-[#a3d995] transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Ver Planos <ArrowRight size={20} />
            </Link>
            <Link 
              to="/sobre" 
              className="px-8 py-3 bg-transparent border-2 border-[#bae8b0] text-[#bae8b0] font-bold rounded-full hover:bg-[#bae8b0] hover:text-[#020e27] transition-all flex items-center justify-center"
            >
              Saiba Mais
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#020e27] mb-4">Por que escolher a SeguraLife?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nossa missão é garantir que você tenha as melhores opções para proteger seu futuro e de quem você ama.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<ShieldCheck className="h-12 w-12 text-[#bae8b0]" />}
              title="Segurança Garantida"
              description="Coberturas abrangentes que garantem sua tranquilidade em qualquer situação."
            />
            <FeatureCard 
              icon={<Users className="h-12 w-12 text-[#bae8b0]" />}
              title="Atendimento Humanizado"
              description="Nossa equipe está sempre pronta para ajudar você com empatia e eficiência."
            />
            <FeatureCard 
              icon={<TrendingUp className="h-12 w-12 text-[#bae8b0]" />}
              title="Planos Flexíveis"
              description="Opções que se adaptam ao seu orçamento e necessidades específicas."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-[#eeede9]">
        <div className="max-w-5xl mx-auto bg-[#020e27] rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Pronto para começar?</h3>
            <p className="text-[#cccace]">Encontre o plano ideal para você em poucos cliques.</p>
          </div>
          <Link 
            to="/produtos"
            className="whitespace-nowrap px-8 py-4 bg-[#bae8b0] text-[#020e27] font-bold rounded-xl hover:bg-[#a3d995] transition-colors shadow-lg"
          >
            Simular Agora
          </Link>
        </div>
      </section>

      <BotaoTeste />
    
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
      <div className="mb-4 bg-[#020e27] p-4 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#020e27] mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}