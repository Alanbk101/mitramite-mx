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
  modalidad: "En línea" | "Presencial" | "En línea y presencial";
  dificultad: "Fácil" | "Medio" | "Difícil";
  requisitos: string[];
  pasos: TramiteStep[];
  tips: string[];
  url: string;
  actualizado: string;
}

// Última revisión: abril 2026
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
      "Verifica que tu acta de nacimiento no tenga errores antes de ir.",
      "Si cambias de domicilio, actualiza tu credencial lo antes posible.",
    ],
    url: "https://www.ine.mx",
    actualizado: "Abril 2026",
  },
  {
    slug: "sat-rfc",
    icon: CreditCard,
    title: "SAT / RFC",
    desc: "Alta, constancia y declaraciones fiscales.",
    keywords: ["sat", "rfc", "fiscal", "impuestos", "declaración", "alta"],
    fullDescription:
      "El Registro Federal de Contribuyentes (RFC) es indispensable para trabajar formalmente, facturar y cumplir con tus obligaciones fiscales en México. Desde 2022, es obligatorio para mayores de 18 años.",
    costo: "Gratuito",
    tiempo: "Mismo día (en línea) o 1-2 horas (presencial)",
    vigencia: "Permanente",
    requisitos: [
      "CURP",
      "Acta de nacimiento",
      "Comprobante de domicilio reciente (no mayor a 3 meses)",
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
      "Desde 2022 es obligatorio para todos los mayores de 18 años.",
    ],
    url: "https://www.sat.gob.mx",
    actualizado: "Abril 2026",
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
      "Próximamente se implementará la CURP biométrica en México.",
    ],
    url: "https://www.gob.mx/curp",
    actualizado: "Abril 2026",
  },
  {
    slug: "pasaporte",
    icon: Globe,
    title: "Pasaporte",
    desc: "Trámite de pasaporte nuevo o renovación.",
    keywords: ["pasaporte", "renovar", "viajar", "viaje"],
    fullDescription:
      "El pasaporte mexicano es el documento oficial de viaje que te permite salir y entrar al país. Es emitido por la Secretaría de Relaciones Exteriores (SRE). Los costos se actualizaron en 2026.",
    costo: "$1,795 - $4,280 MXN (según vigencia 2026)",
    tiempo: "3-6 semanas",
    vigencia: "1, 3, 6 o 10 años",
    requisitos: [
      "Acta de nacimiento certificada (copia reciente)",
      "Identificación oficial vigente (INE)",
      "CURP",
      "Comprobante de pago de derechos",
      "Fotografías (se toman en la oficina de pasaportes)",
    ],
    pasos: [
      { title: "Agenda tu cita en línea", description: "Entra a citas.sre.gob.mx y selecciona la oficina de pasaportes y fecha." },
      { title: "Realiza el pago", description: "Paga en banco autorizado: $920 (1 año), $1,795 (3 años), $2,440 (6 años) o $4,280 (10 años)." },
      { title: "Acude a tu cita", description: "Lleva todos los documentos originales. Te tomarán foto y huellas." },
      { title: "Recibe tu pasaporte", description: "Lo recibes en la oficina o por mensajería en el plazo indicado." },
    ],
    tips: [
      "El pasaporte de 10 años ($4,280 MXN) es el más conveniente en costo por año.",
      "Adultos mayores de 60 años tienen 50% de descuento.",
      "No uses lentes ni accesorios para la foto.",
      "Inicia el trámite al menos 2 meses antes de tu viaje.",
      "El pago solo se realiza en bancos autorizados, nunca en OXXO u otros establecimientos.",
    ],
    url: "https://www.gob.mx/sre",
    actualizado: "Abril 2026",
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
      "Comprobante de domicilio reciente (no mayor a 3 meses)",
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
      "Renueva antes de que expire para poder hacerlo en línea sin cita.",
      "Nunca compartas tu archivo .key ni tu contraseña.",
      "Puedes renovarla en línea si aún está vigente.",
      "La necesitas para la Declaración Anual y para facturar.",
    ],
    url: "https://www.sat.gob.mx",
    actualizado: "Abril 2026",
  },
  {
    slug: "licencia",
    icon: Car,
    title: "Licencia de Conducir",
    desc: "Requisitos según tu estado y tipo.",
    keywords: ["licencia", "conducir", "manejar", "auto", "carro"],
    fullDescription:
      "La licencia de conducir es el permiso oficial para manejar vehículos en México. Los requisitos y costos varían según el estado y el tipo de licencia. Consulta el portal de tu gobierno estatal para precios actualizados 2026.",
    costo: "$500 - $2,000 MXN (varía por estado y vigencia, 2026)",
    tiempo: "Mismo día o 1-2 semanas",
    vigencia: "1 a 5 años según el estado (algunos ofrecen permanente)",
    requisitos: [
      "Identificación oficial vigente (INE)",
      "CURP",
      "Comprobante de domicilio reciente (no mayor a 3 meses)",
      "Certificado médico (tipo de sangre y agudeza visual)",
      "Comprobante de pago de derechos",
      "Aprobar examen teórico y/o práctico (varía por estado)",
    ],
    pasos: [
      { title: "Consulta requisitos de tu estado", description: "Los requisitos y costos varían por entidad. Consulta el sitio de tu gobierno estatal." },
      { title: "Obtén tu certificado médico", description: "Acude a un médico autorizado para el examen de aptitud." },
      { title: "Realiza el pago", description: "Paga los derechos en banco o en línea según tu estado." },
      { title: "Presenta tu examen y recibe tu licencia", description: "Acude al centro de expedición con todos tus documentos." },
    ],
    tips: [
      "Algunos estados como CDMX y Jalisco ya ofrecen licencias permanentes.",
      "Si vienes de otro estado, verifica si necesitas revalidación.",
      "Lleva copias de todos los documentos por si acaso.",
      "Los costos se actualizan cada año; consulta el sitio oficial de tu estado.",
    ],
    url: "https://www.gob.mx",
    actualizado: "Abril 2026",
  },
  {
    slug: "acta-nacimiento",
    icon: Baby,
    title: "Acta de Nacimiento",
    desc: "Solicita copias certificadas en línea.",
    keywords: ["acta", "nacimiento", "registro", "civil", "copia"],
    fullDescription:
      "El acta de nacimiento es el documento que acredita tu identidad y nacionalidad. Puedes obtener copias certificadas en línea desde cualquier lugar. En 2026, se requiere cuenta Llave MX para el trámite digital.",
    costo: "$57 - $243 MXN según el estado (en línea, 2026)",
    tiempo: "Inmediato (descarga digital)",
    vigencia: "Sin vigencia (se recomienda reciente para trámites)",
    requisitos: [
      "CURP de la persona registrada",
      "Cuenta Llave MX (obligatoria desde 2026 para trámite en línea)",
      "Tarjeta bancaria para pago en línea",
      "Acceso a internet",
    ],
    pasos: [
      { title: "Crea tu cuenta Llave MX", description: "Si no tienes cuenta, regístrate en llave.mx.gob.mx con tu CURP y correo electrónico." },
      { title: "Ingresa al portal", description: "Ve a gob.mx/ActaNacimiento e inicia sesión con Llave MX." },
      { title: "Busca tu acta con tu CURP", description: "Ingresa tu CURP y verifica que los datos sean correctos." },
      { title: "Realiza el pago y descarga", description: "Paga con tarjeta bancaria. El costo varía por estado ($57-$243 MXN). Descarga el PDF." },
    ],
    tips: [
      "El acta digital tiene la misma validez que la impresa en papel seguridad.",
      "Desde 2026, necesitas cuenta Llave MX para descargarla en línea.",
      "El costo varía según el estado donde fuiste registrado.",
      "Si tu acta tiene errores, el trámite de corrección es presencial en el registro civil.",
    ],
    url: "https://www.gob.mx/ActaNacimiento",
    actualizado: "Abril 2026",
  },
  {
    slug: "visa-usa",
    icon: FileText,
    title: "Visa USA",
    desc: "Guía completa para tu cita en la embajada.",
    keywords: ["visa", "usa", "estados unidos", "embajada", "cita"],
    fullDescription:
      "La visa de no inmigrante B1/B2 te permite viajar a Estados Unidos por turismo o negocios. En 2026, se añadió una nueva tarifa de $250 USD (Visa Integrity Fee) que se cobra al ser aprobada, elevando el costo total a $435 USD.",
    costo: "$435 USD total ($185 USD solicitud + $250 USD Visa Integrity Fee si es aprobada)",
    tiempo: "2-8 semanas (depende de disponibilidad de citas)",
    vigencia: "Hasta 10 años (entrada múltiple)",
    requisitos: [
      "Pasaporte mexicano vigente (mínimo 6 meses de vigencia)",
      "Formulario DS-160 completado en línea",
      "Fotografía digital reciente (fondo blanco, 5x5 cm)",
      "Comprobante de pago de solicitud ($185 USD)",
      "Comprobantes de solvencia económica (estados de cuenta, constancia de empleo)",
      "Carta de empleo o constancia de estudios",
    ],
    pasos: [
      { title: "Llena el formulario DS-160", description: "Ve a ceac.state.gov y completa el formulario. Guarda tu número de confirmación." },
      { title: "Crea tu perfil y paga", description: "Regístrate en ais.usvisa-info.com, paga $185 USD en banco o en línea." },
      { title: "Agenda tus citas", description: "Programa la cita en el CAS (centro de atención) y en la embajada/consulado." },
      { title: "Acude a la entrevista", description: "Lleva todos tus documentos. La entrevista dura 5-10 minutos." },
      { title: "Paga Visa Integrity Fee y recibe tu visa", description: "Si es aprobada, se cobra $250 USD adicionales. Recibes tu pasaporte con la visa por mensajería." },
    ],
    tips: [
      "Desde 2026, el costo total es $435 USD ($185 solicitud + $250 Visa Integrity Fee al aprobarse).",
      "Sé honesto y conciso en la entrevista.",
      "Demuestra lazos fuertes con México (trabajo, familia, propiedades).",
      "Lleva más documentos de los que piden, por si acaso.",
      "Si te rechazan, pierdes solo los $185 USD de solicitud.",
    ],
    url: "https://mx.usembassy.gov",
    actualizado: "Abril 2026",
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
      "Verifica que tu código postal fiscal esté actualizado.",
    ],
    url: "https://www.sat.gob.mx",
    actualizado: "Abril 2026",
  },
  {
    slug: "declaracion-anual",
    icon: Calculator,
    title: "Declaración Anual SAT",
    desc: "Presenta tu declaración anual de impuestos.",
    keywords: ["declaración", "anual", "sat", "impuestos", "devolución", "fiscal"],
    fullDescription:
      "La Declaración Anual es la obligación fiscal donde reportas tus ingresos, deducciones y calculas el ISR del ejercicio. Puede resultar en saldo a favor con devolución automática. La fecha límite para personas físicas es el 30 de abril de 2026.",
    costo: "Gratuito",
    tiempo: "30-60 minutos",
    vigencia: "Anual — Fecha límite: 30 de abril 2026 (personas físicas) / 31 de marzo 2026 (personas morales)",
    requisitos: [
      "RFC con homoclave",
      "e.firma o contraseña del SAT",
      "CLABE bancaria para devolución de saldo a favor",
      "Constancias de retenciones (si aplica)",
      "Facturas de deducciones personales (CFDI vigentes)",
    ],
    pasos: [
      { title: "Ingresa al portal del SAT", description: "Ve a sat.gob.mx y accede a la sección de Declaraciones." },
      { title: "Revisa la información prellenada", description: "El SAT precarga tus ingresos y retenciones. Verifica que sean correctos." },
      { title: "Agrega deducciones personales", description: "Incluye gastos médicos, educativos, hipotecarios y otros deducibles." },
      { title: "Envía y guarda tu acuse", description: "Firma con e.firma o contraseña y descarga tu acuse de recibo." },
    ],
    tips: [
      "La fecha límite para personas físicas es el 30 de abril de 2026.",
      "Hazlo en las primeras semanas de abril, el portal se satura los últimos días.",
      "Si tienes saldo a favor menor a $150,000 MXN, puedes usar contraseña en vez de e.firma.",
      "La devolución automática tarda 5-10 días hábiles si no hay inconsistencias.",
    ],
    url: "https://www.sat.gob.mx",
    actualizado: "Abril 2026",
  },
  {
    slug: "alta-imss",
    icon: HeartPulse,
    title: "Alta en IMSS",
    desc: "Regístrate como patrón o trabajador independiente.",
    keywords: ["imss", "seguro", "social", "alta", "patrón", "independiente"],
    fullDescription:
      "El alta en el IMSS te permite acceder a servicios de salud, guarderías, incapacidades y ahorro para el retiro. Puedes darte de alta como patrón o en el régimen voluntario como trabajador independiente.",
    costo: "$20,538 MXN anuales en régimen voluntario (2026)",
    tiempo: "1-2 días (en línea) o mismo día (presencial)",
    vigencia: "Mientras se mantenga el pago anual",
    requisitos: [
      "RFC con homoclave",
      "e.firma vigente",
      "CURP",
      "Comprobante de domicilio reciente (no mayor a 3 meses)",
      "Identificación oficial (INE)",
    ],
    pasos: [
      { title: "Ingresa al portal del IMSS", description: "Ve a imss.gob.mx y selecciona el tipo de alta que necesitas." },
      { title: "Llena el formulario", description: "Completa tus datos personales y fiscales en el sistema." },
      { title: "Firma con e.firma", description: "Valida tu registro con tu firma electrónica." },
      { title: "Realiza el pago anual", description: "Paga los $20,538 MXN anuales en banco o en línea." },
    ],
    tips: [
      "El costo del régimen voluntario para 2026 es de $20,538 MXN anuales.",
      "Como patrón, debes dar de alta a tus empleados en los primeros 5 días.",
      "El trámite es gratuito, pero la afiliación requiere pago anual.",
      "Incluye servicios médicos, guarderías, incapacidades y pensión.",
    ],
    url: "https://www.imss.gob.mx",
    actualizado: "Abril 2026",
  },
  {
    slug: "apertura-empresa",
    icon: Building2,
    title: "Apertura de Empresa (SAT)",
    desc: "Registra tu empresa ante el SAT.",
    keywords: ["empresa", "negocio", "apertura", "constitución", "sat", "persona moral"],
    fullDescription:
      "El alta de una empresa ante el SAT es el paso fundamental para operar formalmente. Incluye el registro de la persona moral, la obtención del RFC empresarial y la activación de obligaciones fiscales.",
    costo: "Gratuito ante SAT (notario tiene costo aparte, $8,000-$25,000 MXN aprox.)",
    tiempo: "1-3 días hábiles (SAT) + tiempo de notaría",
    vigencia: "Permanente",
    requisitos: [
      "Acta constitutiva notariada",
      "RFC de todos los socios",
      "e.firma del representante legal",
      "Comprobante de domicilio fiscal (no mayor a 3 meses)",
      "Identificación oficial del representante legal (INE)",
    ],
    pasos: [
      { title: "Constituye la empresa ante notario", description: "El notario elabora el acta constitutiva con los datos de socios y objeto social." },
      { title: "Inscribe en el Registro Público", description: "Registra el acta constitutiva en el Registro Público de Comercio." },
      { title: "Da de alta en el SAT", description: "Agenda cita en el SAT para obtener el RFC de la persona moral." },
      { title: "Obtén e.firma empresarial", description: "Genera la firma electrónica de la empresa para facturar." },
    ],
    tips: [
      "Considera RESICO si eres persona física con actividad empresarial (hasta 3.5M de ingresos anuales).",
      "Compara costos entre notarios, pueden variar de $8,000 a $25,000 MXN.",
      "Ten listo el domicilio fiscal antes de iniciar el trámite.",
      "Puedes constituir una SAS (Sociedad por Acciones Simplificada) sin notario a través de gob.mx.",
    ],
    url: "https://www.sat.gob.mx",
    actualizado: "Abril 2026",
  },
  {
    slug: "carta-antecedentes",
    icon: ShieldCheck,
    title: "Carta de No Antecedentes Penales",
    desc: "Solicita tu constancia de antecedentes.",
    keywords: ["antecedentes", "penales", "carta", "constancia", "segob"],
    fullDescription:
      "La Carta de No Antecedentes Penales es un documento que certifica que no tienes registros penales. Es solicitada para empleos, trámites migratorios y otros procesos legales.",
    costo: "Gratuito (federal) / $200-$500 MXN (estatal, varía por entidad)",
    tiempo: "24-72 horas (en línea)",
    vigencia: "3-6 meses (según la institución que la solicite)",
    requisitos: [
      "Identificación oficial vigente (INE)",
      "CURP",
      "Comprobante de domicilio reciente (no mayor a 3 meses)",
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
      "La carta federal es completamente gratuita y se tramita en línea.",
    ],
    url: "https://antecedentes.segob.gob.mx",
    actualizado: "Abril 2026",
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
    vigencia: "Mientras se cumplan los requisitos de elegibilidad",
    requisitos: [
      "CURP",
      "Comprobante de domicilio reciente (no mayor a 3 meses)",
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
      "Es diferente al régimen voluntario del IMSS; este es completamente gratuito.",
    ],
    url: "https://www.gob.mx/imss",
    actualizado: "Abril 2026",
  },
];
