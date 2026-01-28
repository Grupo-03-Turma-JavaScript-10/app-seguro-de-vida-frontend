import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { Categorias } from "./pages/Categorias";
import { CadastrarCategoria } from "./pages/CadastrarCategoria";
import Produtos from "./pages/Produtos";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans text-gray-900">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/cadastrarCategoria" element={<CadastrarCategoria />} />
          <Route path="/produtos" element={<Produtos />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
