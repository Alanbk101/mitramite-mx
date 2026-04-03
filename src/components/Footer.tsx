const Footer = () => (
  <footer id="contacto" className="border-t border-border bg-card py-8">
    <div className="container text-center text-sm text-muted-foreground">
      <p>Hecho con ❤️ en México para el <span className="font-semibold text-foreground">Nodi Hackathon</span></p>
      <p className="mt-1">© {new Date().getFullYear()} MiTrámite. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;
