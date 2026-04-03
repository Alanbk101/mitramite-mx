import {
  CreditCard,
  FileText,
  Fingerprint,
  Globe,
  IdCard,
  Car,
  Baby,
  Stamp,
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
];
