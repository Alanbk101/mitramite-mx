const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("VITE_GEMINI_API_KEY");

    if (!apiKey) {
      return Response.json(
        { error: "La API key de Gemini no está configurada en los secretos del proyecto." },
        { status: 500, headers: corsHeaders }
      );
    }

    const { userMessage, chatHistory } = await req.json();

    const contents = [
      {
        role: "user",
        parts: [{ text: `${systemPrompt}\n\nRecuerda: eres el asistente de MiTramite. Responde siempre en español mexicano.` }],
      },
      {
        role: "model",
        parts: [{ text: "¡Entendido! Soy el asistente de MiTramite, tu guía de trámites en México. ¿En qué te puedo ayudar?" }],
      },
      ...((chatHistory ?? []) as Array<{ role: string; text: string }>).map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
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
      return Response.json(
        { error: data?.error?.message || `Error ${response.status} de Gemini` },
        { status: response.status, headers: corsHeaders }
      );
    }

    const message = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!message) {
      return Response.json({ error: "No response from Gemini" }, { status: 502, headers: corsHeaders });
    }

    return Response.json({ message }, { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return Response.json({ error: message }, { status: 500, headers: corsHeaders });
  }
});
