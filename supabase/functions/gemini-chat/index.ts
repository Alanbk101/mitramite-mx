import { z } from "npm:zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const RequestSchema = z.object({
  userMessage: z.string().trim().min(1).max(2000),
  chatHistory: z
    .array(
      z.object({
        role: z.enum(["user", "model", "assistant", "bot"]),
        text: z.string().trim().min(1).max(4000),
      })
    )
    .max(20)
    .default([]),
});

type ChatHistoryMessage = z.infer<typeof RequestSchema>["chatHistory"][number];

const systemPrompt = `Eres MiTramite Assistant, un asistente virtual experto en trámites gubernamentales de México. Tu misión es ayudar a cualquier persona a completar sus trámites de forma rápida, clara y sin estrés.

REGLAS:
1. Siempre responde en español mexicano, de forma amigable y clara
2. Estructura tus respuestas con: documentos necesarios, costos, dónde hacerlo, tiempo estimado y tips prácticos
3. Si el usuario pregunta algo que no es un trámite, redirige amablemente
4. Si no estás 100% seguro de un dato (especialmente costos), indícalo y sugiere verificar en el sitio oficial
5. Usa emojis moderadamente para hacer la lectura amigable
6. Si el trámite varía por estado, pregunta en qué estado está el usuario
7. Siempre incluye al menos un tip práctico
8. Máximo 300 palabras por respuesta
9. Nunca inventes requisitos, costos o plazos

FORMATO DE RESPUESTA:
📋 **[Nombre del trámite]**
📄 Documentos: [lista]
💰 Costo: [monto]
📍 Dónde: [lugar]
⏱️ Tiempo: [estimado]
💡 Tip: [consejo práctico]

BASE DE DATOS DE TRÁMITES:

- INE: acta de nacimiento + comprobante domicilio (3 meses) + ID con foto. Gratuito. Módulo INE con cita en ine.mx. 20-40 min.
- RFC: CURP + comprobante domicilio + ID + correo. Gratuito. sat.gob.mx o presencial. 15 min en línea.
- E.FIRMA: INE vigente + CURP + USB vacía + comprobante domicilio. Gratuito. Oficina SAT presencial obligatorio. Cita en citasat.gob.mx.
- CONSTANCIA SITUACIÓN FISCAL: RFC + contraseña SAT. Gratuito. sat.gob.mx o app SAT Móvil sin cita. 5 min.
- DECLARACIÓN ANUAL: RFC + e.firma o contraseña + CLABE bancaria. Gratuito. sat.gob.mx. Límite 30 abril.
- CURP: nombre + fecha nacimiento + entidad + sexo. Gratuito. gob.mx/curp. 2 min en línea.
- PASAPORTE: acta nacimiento certificada + ID + CURP + comprobante domicilio. Desde $1,785 MXN (1 año) hasta $5,180 MXN (10 años). Oficinas SRE con cita en citas.sre.gob.mx.
- LICENCIA DE CONDUCIR: varía por estado. INE + comprobante domicilio + CURP + examen médico. $500-$1,500 MXN.
- ACTA NACIMIENTO: CURP o datos personales. $99-$150 MXN. gob.mx/ActaNacimiento. 5 min en línea.
- VISA AMERICANA B1/B2: pasaporte vigente + DS-160 + comprobante pago + carta empleo + estados de cuenta. $185 USD. Embajada EE.UU. ustraveldocs.com.`;

const reminderPrompt = `${systemPrompt}\n\nRecuerda: eres el asistente de MiTramite. Responde siempre en español mexicano.`;

const buildGoogleContents = (userMessage: string, chatHistory: ChatHistoryMessage[]) => [
  {
    role: "user",
    parts: [{ text: reminderPrompt }],
  },
  {
    role: "model",
    parts: [{ text: "¡Entendido! Soy el asistente de MiTramite, tu guía de trámites en México. ¿En qué te puedo ayudar?" }],
  },
  ...chatHistory.map((msg) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.text }],
  })),
  {
    role: "user",
    parts: [{ text: userMessage }],
  },
];

const buildGatewayMessages = (userMessage: string, chatHistory: ChatHistoryMessage[]) => [
  { role: "system", content: reminderPrompt },
  ...chatHistory.map((msg) => ({
    role: msg.role === "user" ? "user" : "assistant",
    content: msg.text,
  })),
  { role: "user", content: userMessage },
];

const extractGoogleMessage = (data: any) =>
  data?.candidates?.[0]?.content?.parts
    ?.map((part: { text?: string }) => part?.text ?? "")
    .join("\n")
    .trim();

const extractGatewayMessage = (data: any) => {
  const content = data?.choices?.[0]?.message?.content;

  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => (typeof part === "string" ? part : part?.text ?? ""))
      .join("")
      .trim();
  }

  return "";
};

const createErrorResponse = (error: string, status: number) =>
  Response.json({ error }, { status, headers: corsHeaders });

const callGoogleGemini = async (userMessage: string, chatHistory: ChatHistoryMessage[]) => {
  const apiKey = Deno.env.get("VITE_GEMINI_API_KEY");

  if (!apiKey) {
    return {
      ok: false as const,
      status: 500,
      error: "La API key de Gemini no está configurada en los secretos del proyecto.",
    };
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: buildGoogleContents(userMessage, chatHistory),
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 1024,
        },
      }),
    }
  );

  const data = await response.json();
  console.log("Gemini response:", JSON.stringify(data));

  if (!response.ok) {
    return {
      ok: false as const,
      status: response.status,
      error: data?.error?.message || `Error ${response.status} de Gemini`,
    };
  }

  const message = extractGoogleMessage(data);

  if (!message) {
    return {
      ok: false as const,
      status: 502,
      error: "No response from Gemini",
    };
  }

  return {
    ok: true as const,
    message,
  };
};

const callLovableGateway = async (userMessage: string, chatHistory: ChatHistoryMessage[]) => {
  const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

  if (!lovableApiKey) {
    return {
      ok: false as const,
      status: 500,
      error: "LOVABLE_API_KEY no está configurada en el proyecto.",
    };
  }

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-lite",
      messages: buildGatewayMessages(userMessage, chatHistory),
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      ok: false as const,
      status: response.status,
      error:
        response.status === 429
          ? "El servicio de IA está recibiendo demasiadas solicitudes. Intenta de nuevo en unos segundos."
          : response.status === 402
            ? "El servicio de IA no tiene créditos disponibles en este momento."
            : data?.error?.message || data?.error || `Error ${response.status} del servicio de IA`,
    };
  }

  const message = extractGatewayMessage(data);

  if (!message) {
    return {
      ok: false as const,
      status: 502,
      error: "No response from AI gateway",
    };
  }

  return {
    ok: true as const,
    message,
  };
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return createErrorResponse("Method not allowed", 405);
  }

  try {
    const parsedBody = RequestSchema.safeParse(await req.json());

    if (!parsedBody.success) {
      return createErrorResponse("Solicitud inválida para el chat.", 400);
    }

    const { userMessage, chatHistory } = parsedBody.data;

    const googleResult = await callGoogleGemini(userMessage, chatHistory);

    if (googleResult.ok) {
      return Response.json({ message: googleResult.message }, { headers: corsHeaders });
    }

    console.log("Falling back to Lovable AI after Gemini error:", googleResult.error);

    const fallbackResult = await callLovableGateway(userMessage, chatHistory);

    if (fallbackResult.ok) {
      return Response.json({ message: fallbackResult.message }, { headers: corsHeaders });
    }

    return createErrorResponse(fallbackResult.error, fallbackResult.status);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return createErrorResponse(message, 500);
  }
});
