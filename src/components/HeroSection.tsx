import { Search } from "lucide-react";
import PaperPlanesBackground from "./PaperPlanesBackground";

const examples = [
  "INE",
  "Pasaporte",
  "SAT",
  "CURP",
];

interface HeroSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const HeroSection = ({ search, onSearchChange }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-20 text-primary-foreground md:py-28">
      <PaperPlanesBackground />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(160_94%_30%/0.15),transparent_60%)]" />
      <div className="container relative mx-auto max-w-3xl text-center">
        <h1 className="animate-fade-up text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
          Deja de googlear trámites.
          <br />
          <span className="text-secondary">Te llevamos de la mano.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg animate-fade-up text-base text-primary-foreground/70 opacity-0 [animation-delay:150ms] md:text-lg">
          Encuentra guías paso a paso para cualquier trámite en México, sin complicaciones.
        </p>

        <div className="mx-auto mt-8 max-w-xl animate-fade-up opacity-0 [animation-delay:300ms]">
          <div className="flex items-center gap-2 rounded-xl bg-card p-2 shadow-lg shadow-primary/20">
            <Search className="ml-3 shrink-0 text-muted-foreground" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="¿Qué trámite necesitas hacer?"
              className="w-full bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none md:text-base"
            />
            {search && (
              <button
                onClick={() => onSearchChange("")}
                className="shrink-0 rounded-lg px-3 py-3 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex animate-fade-up flex-wrap justify-center gap-2 opacity-0 [animation-delay:450ms]">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => onSearchChange(ex)}
              className="cursor-pointer rounded-full border border-primary-foreground/20 px-3 py-1 text-xs text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
