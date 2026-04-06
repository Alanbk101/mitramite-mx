import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { tramites } from "@/data/tramites";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  Clock,
  DollarSign,
  Monitor,
  BarChart3,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  Download,
  Search,
  Square,
  CheckSquare,
} from "lucide-react";

const difficultyColor: Record<string, string> = {
  "Fácil": "text-green-600 bg-green-50 border-green-200",
  "Medio": "text-amber-600 bg-amber-50 border-amber-200",
  "Difícil": "text-red-600 bg-red-50 border-red-200",
};

const TramiteDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const tramite = tramites.find((t) => t.slug === slug);
  const [checked, setChecked] = useState<boolean[]>([]);

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

  // Initialize checked state lazily
  if (checked.length !== tramite.requisitos.length) {
    setChecked(new Array(tramite.requisitos.length).fill(false));
  }

  const toggleCheck = (index: number) => {
    setChecked((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const handleDownload = () => {
    const lines = [
      `Checklist: ${tramite.title}`,
      `Actualizado: ${tramite.actualizado}`,
      "",
      "DOCUMENTOS NECESARIOS:",
      ...tramite.requisitos.map((r, i) => `${checked[i] ? "✅" : "⬜"} ${r}`),
      "",
      "PASOS:",
      ...tramite.pasos.map((p, i) => `${i + 1}. ${p.title}: ${p.description}`),
      "",
      "TIPS:",
      ...tramite.tips.map((t) => `💡 ${t}`),
      "",
      `Más info: ${tramite.url}`,
      `Generado en MiTramite — tramiton-mx.lovable.app`,,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `checklist-${tramite.slug}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const Icon = tramite.icon;
  const checkedCount = checked.filter(Boolean).length;

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
                <div className="flex flex-wrap items-center gap-3">
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

            {/* Quick info cards */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: DollarSign, label: "Costo", value: tramite.costo },
                { icon: Clock, label: "Tiempo estimado", value: tramite.tiempo },
                { icon: Monitor, label: "Modalidad", value: tramite.modalidad },
                { icon: BarChart3, label: "Dificultad", value: tramite.dificultad },
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

        {/* Documentos necesarios - Interactive checklist */}
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground md:text-2xl">📋 Documentos necesarios</h2>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                {checkedCount}/{tramite.requisitos.length} listos
              </span>
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-secondary transition-all duration-500"
                style={{ width: `${tramite.requisitos.length ? (checkedCount / tramite.requisitos.length) * 100 : 0}%` }}
              />
            </div>
            <ul className="mt-6 space-y-3">
              {tramite.requisitos.map((req, i) => (
                <li
                  key={i}
                  onClick={() => toggleCheck(i)}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-all ${
                    checked[i]
                      ? "border-secondary/30 bg-secondary/5"
                      : "border-border bg-card hover:border-secondary/40"
                  }`}
                >
                  {checked[i] ? (
                    <CheckSquare size={20} className="mt-0.5 shrink-0 text-secondary" />
                  ) : (
                    <Square size={20} className="mt-0.5 shrink-0 text-muted-foreground" />
                  )}
                  <span className={`text-sm ${checked[i] ? "text-muted-foreground line-through" : "text-foreground"}`}>
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Paso a paso - Timeline */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container max-w-3xl">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">🚶 Paso a paso</h2>
            <div className="mt-8 space-y-0">
              {tramite.pasos.map((paso, i) => (
                <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                  {/* Timeline line */}
                  {i < tramite.pasos.length - 1 && (
                    <div className="absolute left-[15px] top-10 h-[calc(100%-24px)] w-0.5 bg-border" />
                  )}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground z-10">
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

        {/* Tips y advertencias */}
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">💡 Tips y advertencias</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {tramite.tips.map((tip, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4"
                >
                  <Lightbulb size={18} className="mt-0.5 shrink-0 text-amber-600" />
                  <span className="text-sm text-amber-900">{tip}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90"
              >
                <Download size={16} />
                Descargar checklist
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-lg border border-secondary px-5 py-3 text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                <Search size={16} />
                Consultar otro trámite
              </Link>
              <a
                href={tramite.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Ir al sitio oficial
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TramiteDetail;
