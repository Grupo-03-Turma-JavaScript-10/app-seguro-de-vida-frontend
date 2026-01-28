import { ShieldCheck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/sobre", label: "Sobre Nós" },
    { path: "/produtos", label: "Planos" },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-[#020e27] rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#bae8b0]" />
            </div>
            <div className="leading-tight">
              <h1 className="text-xl font-bold text-[#020e27]">
                SeguraLife
              </h1>
              <p className="text-xs text-muted-foreground">
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
                        : "text-[#020e27] hover:bg-muted"
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
