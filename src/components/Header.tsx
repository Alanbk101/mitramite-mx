import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoImg from "@/assets/tramiton-logo-final.svg";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center logo-hover">
          <img src={logoImg} alt="MiTramite" className="h-auto w-[160px] md:w-[220px]" />
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <a href="#tramites" className="transition-colors hover:text-primary">Trámites</a>
          <a href="#como-funciona" className="transition-colors hover:text-primary">¿Cómo funciona?</a>
          <a href="#contacto" className="transition-colors hover:text-primary">Contacto</a>
          <a href="/chat" className="transition-colors hover:text-primary">💬 Chat IA</a>
        </nav>

        <button
          className="text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="flex animate-fade-in flex-col gap-4 border-t border-border bg-card px-6 py-4 md:hidden">
          <a href="#tramites" className="text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Trámites</a>
          <a href="#como-funciona" className="text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>¿Cómo funciona?</a>
          <a href="#contacto" className="text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>Contacto</a>
          <a href="/chat" className="text-sm font-medium text-muted-foreground" onClick={() => setOpen(false)}>💬 Chat IA</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
