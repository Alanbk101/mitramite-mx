import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿MiTrámite es un sitio oficial del gobierno?",
    a: "No. MiTrámite es una guía ciudadana independiente que recopila y organiza información pública para facilitarte los trámites. Siempre incluimos enlaces a las páginas oficiales.",
  },
  {
    q: "¿La información está actualizada?",
    a: "Nos esforzamos por mantener los datos al día, pero te recomendamos verificar costos y requisitos en el sitio oficial antes de acudir, ya que pueden cambiar sin previo aviso.",
  },
  {
    q: "¿Puedo hacer mis trámites directamente aquí?",
    a: "No realizamos trámites. Te guiamos paso a paso y te indicamos dónde y cómo hacerlos para que no pierdas tiempo ni dinero.",
  },
  {
    q: "¿Tiene algún costo usar MiTrámite?",
    a: "No, MiTrámite es completamente gratuito. Nuestro objetivo es simplificar la burocracia para todos los mexicanos.",
  },
  {
    q: "¿Cubren trámites de todos los estados?",
    a: "Actualmente nos enfocamos en trámites federales. Estamos trabajando para incluir trámites estatales y municipales próximamente.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-foreground md:text-3xl">
          Preguntas frecuentes
        </h2>
        <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
          Resolvemos tus dudas sobre MiTrámite.
        </p>

        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
