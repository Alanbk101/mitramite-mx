import { Link } from "react-router-dom";
import { tramites } from "@/data/tramites";

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
            {filtered.map(({ icon: Icon, title, desc, slug }, i) => (
              <Link
                to={`/tramite/${slug}`}
                key={slug}
                className="hover-lift group cursor-pointer rounded-xl border border-border bg-card p-5 text-center no-underline"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <Icon size={24} />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground md:text-base">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
              </Link>
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
