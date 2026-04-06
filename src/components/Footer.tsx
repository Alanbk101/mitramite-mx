import logoImg from "@/assets/tramiton-logo-final.svg";

const Footer = () => (
  <footer id="contacto" className="border-t border-border bg-[hsl(222_47%_11%)] py-8">
    <div className="container flex flex-col items-center gap-4 text-center text-sm">
      <img src={logoImg} alt="MiTramite" className="h-auto w-[180px] logo-hover" />
      <p className="text-[hsl(215_20%_65%)]">
        Hecho con ❤️ en México para el <span className="font-semibold text-white">Nodi Hackathon</span>
      </p>
      <p className="text-xs text-[hsl(215_20%_55%)] max-w-md leading-relaxed">
        ⚠️ Los costos y requisitos pueden cambiar. Consulta siempre el sitio oficial de cada institución. Última actualización: abril 2026.
      </p>
      <p className="text-[hsl(215_20%_65%)]">© {new Date().getFullYear()} Tramitón. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;
