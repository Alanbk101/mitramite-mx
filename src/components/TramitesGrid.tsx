import { Link, useNavigate } from "react-router-dom";
import { tramites } from "@/data/tramites";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MessageSquare } from "lucide-react";

interface TramitesGridProps {
  search: string;
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] !== b[j - 1] ? 1 : 0)
      );
  return dp[m][n];
}

function getSuggestions(query: string): string[] {
  const q = query.toLowerCase();
  const candidates = tramites.flatMap((t) => [t.title.toLowerCase(), ...t.keywords]);
  const unique = [...new Set(candidates)];
  return unique
    .map((c) => ({ word: c, dist: levenshtein(q, c.slice(0, q.length + 2)) }))
    .filter((x) => x.dist <= 3 && x.dist > 0)
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 3)
    .map((x) => x.word);
}

const TramitesGrid = ({ search }: TramitesGridProps) => {
  const navigate = useNavigate();
  const query = search.toLowerCase().trim();
  const filtered = query
    ? tramites.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.desc.toLowerCase().includes(query) ||
          t.keywords.some((k) => k.includes(query))
      )
    : tramites;

  const suggestions = query && filtered.length === 0 ? getSuggestions(query) : [];
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="tramites"
      ref={ref}
      className={`py-16 pb-24 md:py-24 md:pb-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
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
            {filtered.map(({ icon: Icon, title, desc, slug, popular }, i) => (
              <Link
                to={`/tramite/${slug}`}
                key={slug}
                className="hover-lift group relative cursor-pointer rounded-xl border border-border bg-card p-5 text-center no-underline shadow-[var(--shadow-card)] hover:border-l-[3px] hover:border-l-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 opacity-0 animate-fade-in"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
                aria-label={`Ver guía de ${title}`}
              >
                {popular && (
                  <span className="absolute -top-2 right-2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                    🔥 Más buscado
                  </span>
                )}
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-gradient-brand group-hover:text-white">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-foreground md:text-base">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-4 text-center text-muted-foreground">
            <p className="text-lg">🔍</p>
            <p className="text-sm">No encontramos trámites con ese término.</p>

            {suggestions.length > 0 && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-foreground">¿Quisiste decir...?</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        const match = tramites.find(
                          (t) => t.title.toLowerCase().includes(s) || t.keywords.includes(s)
                        );
                        if (match) navigate(`/tramite/${match.slug}`);
                      }}
                      className="rounded-full border border-secondary bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => navigate("/chat")}
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <MessageSquare size={16} aria-hidden="true" />
              Preguntarle a la IA
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TramitesGrid;
