import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Sobre from "./pages/Sobre";
import { Home } from "./pages/Home";
import { Categorias } from "./pages/Categorias";
import { CadastrarCategoria } from "./pages/CadastrarCategoria";
import Produtos from "./pages/Produtos";
import CadastrarUsuario from "./pages/CadastrarUsuario";
import { TesteSeguros } from './pages/TesteSeguros/TesteSeguros';
import { Seguros } from './pages/Seguros/Seguros'; // ← ADICIONAR

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans text-gray-900">
      <Header />

      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/cadastrarCategoria" element={<CadastrarCategoria />} />
          <Route path="/planos" element={<Produtos />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/cadastrarUsuario" element={<CadastrarUsuario/>}/>
          <Route path="/testeSeguros" element={<TesteSeguros />} />
          <Route path="/seguros" element={<Seguros />} /> {/* ← ADICIONAR */}
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}