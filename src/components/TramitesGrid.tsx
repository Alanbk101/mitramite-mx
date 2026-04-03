import {
  CreditCard,
  FileText,
  Fingerprint,
  Globe,
  IdCard,
  Car,
  Baby,
  Stamp,
} from "lucide-react";

const tramites = [
  { icon: IdCard, title: "INE / Credencial", desc: "Obtén o renueva tu identificación oficial.", keywords: ["ine", "credencial", "identificación", "votar"] },
  { icon: CreditCard, title: "SAT / RFC", desc: "Alta, constancia y declaraciones fiscales.", keywords: ["sat", "rfc", "fiscal", "impuestos", "declaración", "alta"] },
  { icon: Fingerprint, title: "CURP", desc: "Consulta o imprime tu CURP en línea.", keywords: ["curp", "clave", "única", "registro", "población"] },
  { icon: Globe, title: "Pasaporte", desc: "Trámite de pasaporte nuevo o renovación.", keywords: ["pasaporte", "renovar", "viajar", "viaje"] },
  { icon: Stamp, title: "e.firma (FIEL)", desc: "Firma electrónica del SAT paso a paso.", keywords: ["efirma", "fiel", "firma", "electrónica", "sat"] },
  { icon: Car, title: "Licencia de Conducir", desc: "Requisitos según tu estado y tipo.", keywords: ["licencia", "conducir", "manejar", "auto", "carro"] },
  { icon: Baby, title: "Acta de Nacimiento", desc: "Solicita copias certificadas en línea.", keywords: ["acta", "nacimiento", "registro", "civil", "copia"] },
  { icon: FileText, title: "Visa USA", desc: "Guía completa para tu cita en la embajada.", keywords: ["visa", "usa", "estados unidos", "embajada", "cita"] },
];

interface TramitesGridProps {
  search: string;
}

const TramitesGrid = ({ search }: TramitesGridProps) => {
  const query = search.toLowerCase().trim();
  const filtered = query
    ? tramites.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.desc.toLowerCase().includes(query) ||
          t.keywords.some((k) => k.includes(query))
      )
    : tramites;

  return (
    <section id="tramites" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
          {query ? `Resultados para "${search}"` : "Trámites más populares"}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
          {query
            ? `${filtered.length} trámite${filtered.length !== 1 ? "s" : ""} encontrado${filtered.length !== 1 ? "s" : ""}`
            : "Selecciona un trámite para ver la guía completa con requisitos, costos y pasos."}
        </p>

        {filtered.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
            {filtered.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="hover-lift group cursor-pointer rounded-xl border border-border bg-card p-5 text-center"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <Icon size={24} />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground md:text-base">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-2 text-center text-muted-foreground">
            <p className="text-lg">🔍</p>
            <p className="text-sm">No encontramos trámites con ese término. Intenta con otra búsqueda.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TramitesGrid;
