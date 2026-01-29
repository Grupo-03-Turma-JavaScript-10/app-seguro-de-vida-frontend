import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#020e27] text-[#cccace] pt-12 pb-6 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* sobre o app */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#bae8b0]">SeguraLife</h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Protegendo o que mais importa para você. Soluções completas em seguros de vida, 
              saúde e previdência, adaptadas ao seu ritmo e necessidades.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-[#bae8b0] transition-colors" title="Facebook"><Facebook size={20} /></a>
              <a href="#" className="hover:text-[#bae8b0] transition-colors" title="Instagram"><Instagram size={20} /></a>
              <a href="#" className="hover:text-[#bae8b0] transition-colors" title="Twitter"><Twitter size={20} /></a>
              <a href="#" className="hover:text-[#bae8b0] transition-colors" title="Linkedin"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* sessão dos contatos */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#eeede9]">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-[#bae8b0]" />
                <span className="text-sm">Av. Paulista, 1000 - São Paulo, SP</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-[#bae8b0]" />
                <span className="text-sm">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-[#bae8b0]" />
                <span className="text-sm">contato@seguralife.com.br</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[#eeede9]">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-[#bae8b0] transition-colors">Home</a></li>
              <li><a href="/temas" className="hover:text-[#bae8b0] transition-colors">Nossos Temas</a></li>
              <li><a href="/planos" className="hover:text-[#bae8b0] transition-colors">Planos Disponíveis</a></li>
              <li><a href="/sobre" className="hover:text-[#bae8b0] transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-[#bae8b0] transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SeguraLife. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
