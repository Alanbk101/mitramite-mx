import {
  CreditCard,
  FileText,
  Fingerprint,
  Globe,
  IdCard,
  Car,
  Baby,
  Stamp,
  ClipboardList,
  Calculator,
  HeartPulse,
  Building2,
  ShieldCheck,
  Hospital,
  type LucideIcon,
} from "lucide-react";

export interface TramiteStep {
  title: string;
  description: string;
}

export interface Tramite {
  slug: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  keywords: string[];
  fullDescription: string;
  costo: string;
  tiempo: string;
  vigencia: string;
  requisitos: string[];
  pasos: TramiteStep[];
  tips: string[];
  url: string;
}

export const tramites: Tramite[] = [
  {
    slug: "ine",
    icon: IdCard,
    title: "INE / Credencial",
    desc: "Obtén o renueva tu identificación oficial.",
    keywords: ["ine", "credencial", "identificación", "votar"],
    fullDescription:
      "La credencial para votar expedida por el INE es el documento de identificación oficial más utilizado en México. Sirve para votar, realizar trámites bancarios, gubernamentales y más.",
    costo: "Gratuito",
    tiempo: "2-4 semanas",
    vigencia: "10 años",
    requisitos: [
      "Acta de nacimiento original o certificada",
      "Comprobante de domicilio reciente (no mayor a 3 meses)",
      "Identificación oficial con fotografía (si es renovación)",
      "CURP (se puede consultar en línea)",
      "Ser ciudadano mexicano mayor de 18 años",
    ],
    pasos: [
      { title: "Agenda tu cita", description: "Entra a citas.ine.mx y selecciona tu módulo y fecha disponibles." },
      { title: "Reúne tus documentos", description: "Lleva originales de todos los requisitos listados arriba." },
      { title: "Acude al módulo del INE", description: "Preséntate el día de tu cita con tus documentos. Te tomarán foto, huellas y firma." },
      { title: "Recoge tu credencial", description: "Regresa al módulo en la fecha indicada (aprox. 2-4 semanas) con tu comprobante." },
    ],
    tips: [
      "Llega 15 minutos antes de tu cita.",
      "Verifica que tu acta de nacimiento no tenga errores.",
      "Si cambias de domicilio, actualiza tu credencial.",
    ],
    url: "https://www.ine.mx",
  },
  {
    slug: "sat-rfc",
    icon: CreditCard,
    title: "SAT / RFC",
    desc: "Alta, constancia y declaraciones fiscales.",
    keywords: ["sat", "rfc", "fiscal", "impuestos", "declaración", "alta"],
    fullDescription:
      "El Registro Federal de Contribuyentes (RFC) es indispensable para trabajar formalmente, facturar y cumplir con tus obligaciones fiscales en México.",
    costo: "Gratuito",
    tiempo: "Mismo día (en línea) o 1-2 horas (presencial)",
    vigencia: "Permanente",
    requisitos: [
      "CURP",
      "Acta de nacimiento",
      "Comprobante de domicilio reciente",
      "Identificación oficial vigente (INE)",
      "Correo electrónico personal",
    ],
    pasos: [
      { title: "Preinscripción en línea", description: "Entra a sat.gob.mx y llena el formulario de preinscripción con tus datos personales." },
      { title: "Agenda cita (si es necesario)", description: "Para obtener tu contraseña o e.firma, agenda cita en una oficina del SAT." },
      { title: "Acude a la oficina del SAT", description: "Lleva tus documentos originales y la hoja de preinscripción impresa." },
      { title: "Recibe tu RFC y contraseña", description: "Te entregarán tu cédula de identificación fiscal con tu RFC." },
    ],
    tips: [
      "Puedes obtener tu RFC con homoclave en línea si solo necesitas la clave.",
      "Guarda tu contraseña del SAT en un lugar seguro.",
      "Si eres asalariado, tu patrón puede darte de alta.",
    ],
    url: "https://www.sat.gob.mx",
  },
  {
    slug: "curp",
    icon: Fingerprint,
    title: "CURP",
    desc: "Consulta o imprime tu CURP en línea.",
    keywords: ["curp", "clave", "única", "registro", "población"],
    fullDescription:
      "La Clave Única de Registro de Población (CURP) es un código alfanumérico de 18 caracteres que identifica a cada persona en México. Es indispensable para casi cualquier trámite.",
    costo: "Gratuito",
    tiempo: "Inmediato (en línea)",
    vigencia: "Permanente",
    requisitos: [
      "Nombre completo",
      "Fecha de nacimiento",
      "Entidad de nacimiento",
      "Sexo",
    ],
    pasos: [
      { title: "Ingresa al portal", description: "Ve a gob.mx/curp para consultar tu CURP." },
      { title: "Ingresa tus datos", description: "Llena el formulario con tu nombre, fecha y lugar de nacimiento." },
      { title: "Descarga tu CURP", description: "Aparecerá tu CURP con código QR. Descarga o imprime el PDF." },
    ],
    tips: [
      "Si tu CURP tiene errores, puedes solicitar corrección en el registro civil.",
      "La CURP es la misma de por vida, no cambia.",
      "Puedes consultarla las veces que necesites sin costo.",
    ],
    url: "https://www.gob.mx/curp",
  },
  {
    slug: "pasaporte",
    icon: Globe,
    title: "Pasaporte",
    desc: "Trámite de pasaporte nuevo o renovación.",
    keywords: ["pasaporte", "renovar", "viajar", "viaje"],
    fullDescription:
      "El pasaporte mexicano es el documento oficial de viaje que te permite salir y entrar al país. Es emitido por la Secretaría de Relaciones Exteriores (SRE).",
    costo: "$1,685 - $2,540 MXN (según vigencia)",
    tiempo: "3-6 semanas",
    vigencia: "3, 6 o 10 años",
    requisitos: [
      "Acta de nacimiento certificada (copia reciente)",
      "Identificación oficial vigente (INE)",
      "CURP",
      "Comprobante de pago de derechos",
      "Fotografías (se toman en la delegación)",
    ],
    pasos: [
      { title: "Agenda tu cita en línea", description: "Entra a citas.sre.gob.mx y selecciona la delegación y fecha." },
      { title: "Realiza el pago", description: "Paga en banco o en línea según la vigencia que elijas." },
      { title: "Acude a tu cita", description: "Lleva todos los documentos originales. Te tomarán foto y huellas." },
      { title: "Recibe tu pasaporte", description: "Lo recibes en la delegación o por mensajería en el plazo indicado." },
    ],
    tips: [
      "El pasaporte de 10 años es el más conveniente en costo por año.",
      "No uses lentes ni accesorios para la foto.",
      "Inicia el trámite al menos 2 meses antes de tu viaje.",
    ],
    url: "https://www.gob.mx/sre",
  },
  {
    slug: "efirma",
    icon: Stamp,
    title: "e.firma (FIEL)",
    desc: "Firma electrónica del SAT paso a paso.",
    keywords: ["efirma", "fiel", "firma", "electrónica", "sat"],
    fullDescription:
      "La e.firma (antes FIEL) es tu firma electrónica avanzada que te permite realizar trámites fiscales en línea con validez legal. Es indispensable para facturar y presentar declaraciones.",
    costo: "Gratuito",
    tiempo: "Mismo día (con cita)",
    vigencia: "4 años (renovable)",
    requisitos: [
      "Identificación oficial vigente (INE)",
      "CURP",
      "Comprobante de domicilio reciente",
      "Correo electrónico personal",
      "Memoria USB para guardar tus archivos",
    ],
    pasos: [
      { title: "Agenda cita en el SAT", description: "Entra a sat.gob.mx y selecciona el trámite de e.firma." },
      { title: "Acude con tus documentos", description: "Lleva originales y tu USB. Te tomarán huellas digitales." },
      { title: "Genera tu e.firma", description: "En la oficina generarán tus archivos .cer y .key." },
      { title: "Guarda tus archivos", description: "Respalda los archivos y tu contraseña en un lugar seguro." },
    ],
    tips: [
      "Renueva antes de que expire para evitar ir presencialmente.",
      "Nunca compartas tu archivo .key ni tu contraseña.",
      "Puedes renovarla en línea si aún está vigente.",
    ],
    url: "https://www.sat.gob.mx",
  },
  {
    slug: "licencia",
    icon: Car,
    title: "Licencia de Conducir",
    desc: "Requisitos según tu estado y tipo.",
    keywords: ["licencia", "conducir", "manejar", "auto", "carro"],
    fullDescription:
      "La licencia de conducir es el permiso oficial para manejar vehículos en México. Los requisitos y costos varían según el estado y el tipo de licencia.",
    costo: "$500 - $1,500 MXN (varía por estado)",
    tiempo: "Mismo día o 1-2 semanas",
    vigencia: "3 o 5 años (según el estado)",
    requisitos: [
      "Identificación oficial vigente (INE)",
      "CURP",
      "Comprobante de domicilio reciente",
      "Certificado médico (tipo de sangre y agudeza visual)",
      "Comprobante de pago de derechos",
      "Aprobar examen teórico y/o práctico (varía por estado)",
    ],
    pasos: [
      { title: "Consulta requisitos de tu estado", description: "Los requisitos varían por entidad. Consulta el sitio de tu gobierno estatal." },
      { title: "Obtén tu certificado médico", description: "Acude a un médico autorizado para el examen de aptitud." },
      { title: "Realiza el pago", description: "Paga los derechos en banco o en línea según tu estado." },
      { title: "Presenta tu examen y recibe tu licencia", description: "Acude al centro de expedición con todos tus documentos." },
    ],
    tips: [
      "Algunos estados ya ofrecen licencias permanentes.",
      "Si vienes de otro estado, verifica si necesitas revalidación.",
      "Lleva copias de todos los documentos por si acaso.",
    ],
    url: "https://www.gob.mx",
  },
  {
    slug: "acta-nacimiento",
    icon: Baby,
    title: "Acta de Nacimiento",
    desc: "Solicita copias certificadas en línea.",
    keywords: ["acta", "nacimiento", "registro", "civil", "copia"],
    fullDescription:
      "El acta de nacimiento es el documento que acredita tu identidad y nacionalidad. Puedes obtener copias certificadas en línea desde cualquier lugar.",
    costo: "$86 MXN (en línea)",
    tiempo: "Inmediato (descarga digital)",
    vigencia: "Sin vigencia (se recomienda reciente para trámites)",
    requisitos: [
      "CURP de la persona registrada",
      "Tarjeta bancaria para pago en línea",
      "Acceso a internet",
    ],
    pasos: [
      { title: "Ingresa al portal", description: "Ve a actanacimiento.gob.mx para iniciar el trámite." },
      { title: "Busca tu acta con tu CURP", description: "Ingresa tu CURP y verifica que los datos sean correctos." },
      { title: "Realiza el pago", description: "Paga con tarjeta de débito o crédito ($86 MXN)." },
      { title: "Descarga tu acta", description: "Descarga el PDF con validez oficial. Puedes imprimirla." },
    ],
    tips: [
      "El acta digital tiene la misma validez que la impresa en papel seguridad.",
      "Puedes descargarla múltiples veces desde tu correo.",
      "Si tu acta tiene errores, el trámite de corrección es presencial.",
    ],
    url: "https://www.actanacimiento.gob.mx",
  },
  {
    slug: "visa-usa",
    icon: FileText,
    title: "Visa USA",
    desc: "Guía completa para tu cita en la embajada.",
    keywords: ["visa", "usa", "estados unidos", "embajada", "cita"],
    fullDescription:
      "La visa de no inmigrante B1/B2 te permite viajar a Estados Unidos por turismo o negocios. El proceso incluye formulario en línea, pago y entrevista consular.",
    costo: "$185 USD (visa de turista B1/B2)",
    tiempo: "2-6 semanas (depende de disponibilidad de citas)",
    vigencia: "Hasta 10 años (entrada múltiple)",
    requisitos: [
      "Pasaporte mexicano vigente",
      "Formulario DS-160 completado en línea",
      "Fotografía digital reciente",
      "Comprobante de pago de solicitud ($185 USD)",
      "Comprobantes de solvencia económica",
      "Carta de empleo o constancia de estudios",
    ],
    pasos: [
      { title: "Llena el formulario DS-160", description: "Ve a ceac.state.gov y completa el formulario. Guarda tu número de confirmación." },
      { title: "Crea tu perfil y paga", description: "Regístrate en ais.usvisa-info.com, paga $185 USD en banco o en línea." },
      { title: "Agenda tus citas", description: "Programa la cita en el CAS (centro de atención) y en la embajada/consulado." },
      { title: "Acude a la entrevista", description: "Lleva todos tus documentos. La entrevista dura 5-10 minutos." },
      { title: "Recibe tu visa", description: "Si es aprobada, recibes tu pasaporte con la visa por mensajería." },
    ],
    tips: [
      "Sé honesto y conciso en la entrevista.",
      "Demuestra lazos fuertes con México (trabajo, familia, propiedades).",
      "Lleva más documentos de los que piden, por si acaso.",
      "Si te rechazan, puedes volver a aplicar en cualquier momento.",
    ],
    url: "https://mx.usembassy.gov",
  },
  {
    slug: "constancia-fiscal",
    icon: ClipboardList,
    title: "Constancia de Situación Fiscal",
    desc: "Descarga tu constancia desde el portal SAT.",
    keywords: ["constancia", "situación fiscal", "sat", "rfc", "fiscal"],
    fullDescription:
      "La Constancia de Situación Fiscal es un documento que acredita tu registro ante el SAT, tu régimen fiscal y tu código postal fiscal. Es solicitada frecuentemente por empleadores y para trámites bancarios.",
    costo: "Gratuito",
    tiempo: "5 minutos (en línea)",
    vigencia: "Sin vigencia fija (se recomienda reciente)",
    requisitos: [
      "RFC con homoclave",
      "Contraseña del SAT o e.firma",
    ],
    pasos: [
      { title: "Ingresa al portal del SAT", description: "Ve a sat.gob.mx y accede con tu RFC y contraseña." },
      { title: "Busca la opción", description: "En el menú, selecciona 'Otros trámites y servicios' > 'Genera tu Constancia de Situación Fiscal'." },
      { title: "Descarga el PDF", description: "El sistema generará tu constancia. Descárgala e imprímela." },
    ],
    tips: [
      "Ya no necesitas cita presencial, usa la app SAT Móvil.",
      "También puedes obtenerla desde la app SAT Móvil en tu celular.",
      "Algunos empleadores piden que sea del mes en curso.",
    ],
    url: "https://www.sat.gob.mx",
  },
  {
    slug: "declaracion-anual",
    icon: Calculator,
    title: "Declaración Anual SAT",
    desc: "Presenta tu declaración anual de impuestos.",
    keywords: ["declaración", "anual", "sat", "impuestos", "devolución", "fiscal"],
    fullDescription:
      "La Declaración Anual es la obligación fiscal donde reportas tus ingresos, deducciones y calculas el ISR del ejercicio. Puede resultar en saldo a favor con devolución automática.",
    costo: "Gratuito",
    tiempo: "30-60 minutos",
    vigencia: "Anual (fecha límite: 30 de abril personas físicas, 31 de marzo personas morales)",
    requisitos: [
      "RFC con homoclave",
      "e.firma o contraseña del SAT",
      "CLABE bancaria para devolución de saldo a favor",
      "Constancias de retenciones (si aplica)",
      "Facturas de deducciones personales",
    ],
    pasos: [
      { title: "Ingresa al portal del SAT", description: "Ve a sat.gob.mx y accede a la sección de Declaraciones." },
      { title: "Revisa la información prellenada", description: "El SAT precarga tus ingresos y retenciones. Verifica que sean correctos." },
      { title: "Agrega deducciones personales", description: "Incluye gastos médicos, educativos, hipotecarios y otros deducibles." },
      { title: "Envía y guarda tu acuse", description: "Firma con e.firma o contraseña y descarga tu acuse de recibo." },
    ],
    tips: [
      "Hazlo en las primeras semanas de abril, el portal se satura los últimos días.",
      "Revisa que tus facturas de deducciones estén correctamente emitidas.",
      "Si tienes saldo a favor, la devolución automática tarda 5-10 días hábiles.",
    ],
    url: "https://www.sat.gob.mx",
  },
  {
    slug: "alta-imss",
    icon: HeartPulse,
    title: "Alta en IMSS",
    desc: "Regístrate como patrón o trabajador independiente.",
    keywords: ["imss", "seguro", "social", "alta", "patrón", "independiente"],
    fullDescription:
      "El alta en el IMSS te permite acceder a servicios de salud, guarderías, incapacidades y ahorro para el retiro. Puedes darte de alta como patrón o en el régimen voluntario como trabajador independiente.",
    costo: "Varía según salario base de cotización (~$7,000 MXN bimestrales en régimen voluntario)",
    tiempo: "1-2 días (en línea) o mismo día (presencial)",
    vigencia: "Mientras se mantenga el pago",
    requisitos: [
      "RFC con homoclave",
      "e.firma vigente",
      "CURP",
      "Comprobante de domicilio reciente",
      "Identificación oficial (INE)",
    ],
    pasos: [
      { title: "Ingresa al portal del IMSS", description: "Ve a imss.gob.mx y selecciona el tipo de alta que necesitas." },
      { title: "Llena el formulario", description: "Completa tus datos personales y fiscales en el sistema." },
      { title: "Firma con e.firma", description: "Valida tu registro con tu firma electrónica." },
      { title: "Realiza el primer pago", description: "Genera la línea de captura y paga en banco o en línea." },
    ],
    tips: [
      "El régimen voluntario cuesta desde ~$7,000 MXN bimestrales.",
      "Como patrón, debes dar de alta a tus empleados en los primeros 5 días.",
      "Consulta las modalidades disponibles antes de elegir.",
    ],
    url: "https://www.imss.gob.mx",
  },
  {
    slug: "apertura-empresa",
    icon: Building2,
    title: "Apertura de Empresa (SAT)",
    desc: "Registra tu empresa ante el SAT.",
    keywords: ["empresa", "negocio", "apertura", "constitución", "sat", "persona moral"],
    fullDescription:
      "El alta de una empresa ante el SAT es el paso fundamental para operar formalmente. Incluye el registro de la persona moral, la obtención del RFC empresarial y la activación de obligaciones fiscales.",
    costo: "Gratuito ante SAT (notario tiene costo aparte)",
    tiempo: "1-3 días hábiles",
    vigencia: "Permanente",
    requisitos: [
      "Acta constitutiva notariada",
      "RFC de todos los socios",
      "e.firma del representante legal",
      "Comprobante de domicilio fiscal",
      "Identificación oficial del representante legal",
    ],
    pasos: [
      { title: "Constituye la empresa ante notario", description: "El notario elabora el acta constitutiva con los datos de socios y objeto social." },
      { title: "Inscribe en el Registro Público", description: "Registra el acta constitutiva en el Registro Público de Comercio." },
      { title: "Da de alta en el SAT", description: "Agenda cita en el SAT para obtener el RFC de la persona moral." },
      { title: "Obtén e.firma empresarial", description: "Genera la firma electrónica de la empresa para facturar." },
    ],
    tips: [
      "Considera RESICO si eres persona física con actividad empresarial.",
      "Compara costos entre notarios, pueden variar significativamente.",
      "Ten listo el domicilio fiscal antes de iniciar el trámite.",
    ],
    url: "https://www.sat.gob.mx",
  },
  {
    slug: "carta-antecedentes",
    icon: ShieldCheck,
    title: "Carta de No Antecedentes Penales",
    desc: "Solicita tu constancia de antecedentes.",
    keywords: ["antecedentes", "penales", "carta", "constancia", "segob"],
    fullDescription:
      "La Carta de No Antecedentes Penales es un documento que certifica que no tienes registros penales. Es solicitada para empleos, trámites migratorios y otros procesos legales.",
    costo: "Gratuito (federal) / $200-$500 MXN (estatal)",
    tiempo: "24-72 horas (en línea)",
    vigencia: "3-6 meses (según la institución que la solicite)",
    requisitos: [
      "Identificación oficial vigente (INE)",
      "CURP",
      "Comprobante de domicilio reciente",
    ],
    pasos: [
      { title: "Ingresa al portal", description: "Ve a antecedentes.segob.gob.mx para la carta federal." },
      { title: "Llena el formulario", description: "Ingresa tus datos personales y sube las fotos de tus documentos." },
      { title: "Paga (si es estatal)", description: "Para la versión estatal, realiza el pago correspondiente." },
      { title: "Descarga tu carta", description: "Recibirás la carta en PDF por correo electrónico en 24-72 horas." },
    ],
    tips: [
      "La federal y la estatal son documentos diferentes, verifica cuál necesitas.",
      "Para trámites migratorios generalmente se requiere la federal.",
      "Algunas empresas aceptan la versión digital sin necesidad de imprimirla.",
    ],
    url: "https://antecedentes.segob.gob.mx",
  },
  {
    slug: "imss-bienestar",
    icon: Hospital,
    title: "IMSS-Bienestar",
    desc: "Seguro de salud gratuito sin empleo formal.",
    keywords: ["imss", "bienestar", "seguro", "popular", "salud", "gratuito"],
    fullDescription:
      "IMSS-Bienestar (antes Seguro Popular) es el programa de salud gratuito para personas que no cuentan con seguridad social por empleo formal. Ofrece atención médica, medicamentos y hospitalización sin costo.",
    costo: "Gratuito",
    tiempo: "Mismo día (presencial)",
    vigencia: "Mientras se cumplan los requisitos",
    requisitos: [
      "CURP",
      "Comprobante de domicilio reciente",
      "Identificación oficial (INE)",
      "No contar con seguridad social (IMSS, ISSSTE, etc.)",
    ],
    pasos: [
      { title: "Acude a un centro de salud", description: "Ve al centro de salud o módulo IMSS-Bienestar más cercano a tu domicilio." },
      { title: "Presenta tus documentos", description: "Entrega originales y copias de los requisitos." },
      { title: "Llena la solicitud", description: "Completa el formulario de afiliación con tus datos familiares." },
      { title: "Recibe tu comprobante", description: "Te entregarán un comprobante de afiliación para acceder a los servicios." },
    ],
    tips: [
      "Funciona para quienes no tienen seguro social por empleo formal.",
      "Puedes afiliar a toda tu familia en la misma visita.",
      "Cubre consultas, medicamentos, hospitalización y cirugías.",
    ],
    url: "https://www.gob.mx/imss",
  },
];
