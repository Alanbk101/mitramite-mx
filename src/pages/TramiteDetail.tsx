import { useParams, Link } from "react-router-dom";
import { tramites } from "@/data/tramites";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Clock,
  DollarSign,
  CalendarCheck,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

const TramiteDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const tramite = tramites.find((t) => t.slug === slug);

  if (!tramite) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
          <p className="text-4xl">😕</p>
          <h1 className="text-2xl font-bold text-foreground">Trámite no encontrado</h1>
          <Link to="/" className="text-sm font-medium text-secondary underline">
            Volver al inicio
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = tramite.icon;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary px-4 py-12 text-primary-foreground md:py-16">
          <div className="container max-w-3xl">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-1 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              <ArrowLeft size={16} />
              Volver a trámites
            </Link>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <Icon size={28} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-extrabold md:text-3xl">{tramite.title}</h1>
                  <span className="rounded-full bg-secondary px-3 py-0.5 text-xs font-semibold text-secondary-foreground">
                    {tramite.actualizado}
                  </span>
                </div>
                <p className="mt-2 text-sm text-primary-foreground/70 md:text-base">
                  {tramite.fullDescription}
                </p>
              </div>
            </div>

            {/* Quick info */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: DollarSign, label: "Costo", value: tramite.costo },
                { icon: Clock, label: "Tiempo", value: tramite.tiempo },
                { icon: CalendarCheck, label: "Vigencia", value: tramite.vigencia },
              ].map(({ icon: QIcon, label, value }) => (
                <div
                  key={label}
                  className="rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-3"
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-primary-foreground/60">
                    <QIcon size={14} />
                    {label}
                  </div>
                  <p className="mt-1 text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Requisitos */}
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">📋 Requisitos</h2>
            <ul className="mt-6 space-y-3">
              {tramite.requisitos.map((req, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-secondary" />
                  <span className="text-sm text-foreground">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pasos */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container max-w-3xl">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">🚶 Paso a paso</h2>
            <div className="mt-6 space-y-4">
              {tramite.pasos.map((paso, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4 flex-1">
                    <h3 className="text-sm font-semibold text-foreground">{paso.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{paso.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">💡 Tips</h2>
            <ul className="mt-6 space-y-3">
              {tramite.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Lightbulb size={16} className="mt-0.5 shrink-0 text-amber-500" />
                  <span className="text-sm text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>

            <a
              href={tramite.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              Ir al sitio oficial
              <ExternalLink size={16} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TramiteDetail;
