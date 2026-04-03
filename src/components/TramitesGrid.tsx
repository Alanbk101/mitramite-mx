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
  { icon: IdCard, title: "INE / Credencial", desc: "Obtén o renueva tu identificación oficial." },
  { icon: CreditCard, title: "SAT / RFC", desc: "Alta, constancia y declaraciones fiscales." },
  { icon: Fingerprint, title: "CURP", desc: "Consulta o imprime tu CURP en línea." },
  { icon: Globe, title: "Pasaporte", desc: "Trámite de pasaporte nuevo o renovación." },
  { icon: Stamp, title: "e.firma (FIEL)", desc: "Firma electrónica del SAT paso a paso." },
  { icon: Car, title: "Licencia de Conducir", desc: "Requisitos según tu estado y tipo." },
  { icon: Baby, title: "Acta de Nacimiento", desc: "Solicita copias certificadas en línea." },
  { icon: FileText, title: "Visa USA", desc: "Guía completa para tu cita en la embajada." },
];

const TramitesGrid = () => {
  return (
    <section id="tramites" className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
          Trámites más populares
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
          Selecciona un trámite para ver la guía completa con requisitos, costos y pasos.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
          {tramites.map(({ icon: Icon, title, desc }, i) => (
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
      </div>
    </section>
  );
};

export default TramitesGrid;
