import { Search, ListChecks, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    icon: Search,
    title: "1. Busca tu trámite",
    desc: "Escribe qué necesitas hacer y te mostramos la guía correcta.",
  },
  {
    icon: ListChecks,
    title: "2. Sigue los pasos",
    desc: "Te damos requisitos, costos, horarios y tips actualizados.",
  },
  {
    icon: ArrowRight,
    title: "3. ¡Listo!",
    desc: "Completa tu trámite sin vueltas innecesarias.",
  },
];

const HowItWorks = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="como-funciona" ref={ref} className={`bg-muted py-16 md:py-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="container">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
          ¿Cómo funciona?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
          En tres simples pasos resuelves cualquier trámite.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                <Icon size={28} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
