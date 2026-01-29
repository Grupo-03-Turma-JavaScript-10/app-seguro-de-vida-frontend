import { ShieldCheck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/sobre", label: "Sobre Nós" },
    { path: "/planos", label: "Planos" },
  ];

  return (
    <header className="bg-gradient-to-r from-[#020e27] via-[#1a2233] to-[#172554] border-b border-border sticky top-0 z-50 shadow-sm text-white">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#020e27] rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#bae8b0]" />
            </div>
            <div className="leading-tight">
              <h1 className="text-xl font-bold text-white">
                SeguraLife
              </h1>
              <p className="text-xs text-[#bae8b0]">
                Proteção hoje, tranquilidade sempre
              </p>
            </div>
          </NavLink>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={
                      isActive
                        ? "bg-[#bae8b0] text-[#020e27] hover:bg-[#a3d995]"
                        : "text-white hover:text-[#bae8b0]"
                    }
                  >
                    {item.label}
                  </Button>
                )}
              </NavLink>
            ))}
          </nav>

          {/* botão Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* menu Mobile */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    {item.label}
                  </Button>
                )}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
