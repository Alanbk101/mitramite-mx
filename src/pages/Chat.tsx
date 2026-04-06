import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { callGemini } from "@/utils/gemini";
import ChatSkeleton from "@/components/ChatSkeleton";

interface Message {
  role: "user" | "bot";
  text: string;
  isError?: boolean;
  canRetry?: boolean;
}

const WELCOME_MESSAGE: Message = {
  role: "bot",
  text: "¡Hola! 👋 Soy el asistente de MiTramite, tu guía de trámites en México. Pregúntame sobre cualquier trámite: INE, RFC, pasaporte, CURP, licencia y más. ¡Estoy aquí para ayudarte!",
};

const SUGGESTION_CHIPS = [
  "🪪 ¿Qué necesito para mi INE?",
  "🧾 ¿Cómo saco mi RFC?",
  "✍️ Requisitos e.firma",
  "🛂 Costo del pasaporte",
  "🆔 Descargar CURP",
  "📋 Declaración anual",
];

const getChatErrorMessage = (error: unknown) => {
  const message = error instanceof Error ? error.message : "";
  if (/(RESOURCE_EXHAUSTED|quota|429)/i.test(message))
    return "⚠️ La API key de Gemini alcanzó su límite de uso o no tiene cuota disponible.";
  if (/(api key|configurada|secretos del proyecto)/i.test(message))
    return "🔑 La API key de Gemini no está configurada correctamente en el proyecto.";
  return "😅 Ups, tuve un problema técnico. ¿Puedes intentar de nuevo?";
};

const isRetryableError = (error: unknown) => {
  const message = error instanceof Error ? error.message : "";
  return !/(RESOURCE_EXHAUSTED|quota|429|api key|configurada|secretos del proyecto)/i.test(message);
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [retryMessage, setRetryMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setShowChips(false);
    setRetryMessage(null);
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const chatHistory = messages
      .filter((m) => m !== WELCOME_MESSAGE && !m.isError)
      .map((m) => ({ role: m.role === "user" ? "user" : "model", text: m.text }));

    try {
      const response = await callGemini(text.trim(), chatHistory);
      setMessages((prev) => [...prev, { role: "bot", text: response }]);
    } catch (error) {
      const errorText = getChatErrorMessage(error);
      const canRetry = isRetryableError(error);
      setRetryMessage(canRetry ? text.trim() : null);
      setMessages((prev) => [...prev, { role: "bot", text: errorText, isError: true, canRetry }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleRetry = () => {
    if (!retryMessage) return;
    setMessages((prev) => prev.filter((m) => !m.isError));
    sendMessage(retryMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-background">
      {/* Header */}
      <header className="shrink-0 border-b border-border bg-card/80 backdrop-blur-md px-4 py-4">
        <div className="mx-auto flex max-w-[800px] items-center gap-3">
          <Link
            to="/"
            className="flex h-8 w-8 items-center justify-center rounded-full text-primary hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Volver al inicio"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold text-foreground">💬 Pregúntale a MiTramite</h1>
            <p className="text-sm text-muted-foreground">Tu asistente de trámites mexicanos 24/7</p>
          </div>
          <div className="w-8" />
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto max-w-[800px] space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
              {msg.role === "bot" && (
                <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm" aria-hidden="true">
                  🤖
                </div>
              )}
              <div
                className={
                  msg.role === "user"
                    ? "max-w-[80%] rounded-[16px_16px_4px_16px] bg-gradient-brand px-4 py-3 text-white"
                    : `max-w-[85%] rounded-[16px_16px_16px_4px] border border-border bg-card px-4 py-4 text-foreground ${msg.isError ? "border-amber-300 bg-amber-50" : ""}`
                }
              >
                {msg.role === "bot" ? (
                  <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-foreground">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                    {msg.isError && msg.canRetry !== false && (
                      <button
                        onClick={handleRetry}
                        className="mt-2 rounded-full border border-primary px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Reintentar
                      </button>
                    )}
                  </div>
                ) : (
                  <span className="text-sm leading-relaxed">{msg.text}</span>
                )}
              </div>
            </div>
          ))}

          {isLoading && <ChatSkeleton />}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-border bg-card">
        {showChips && (
          <div className="mx-auto max-w-[800px] overflow-x-auto px-4 pt-3 pb-1 scrollbar-hide">
            <div className="flex gap-2 whitespace-nowrap">
              {SUGGESTION_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  className="shrink-0 rounded-full border border-border bg-accent px-4 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="mx-auto flex max-w-[800px] items-center gap-3 px-4 py-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Escribe tu pregunta sobre trámites..."
            enterKeyHint="send"
            inputMode="text"
            autoComplete="off"
            className="flex-1 h-12 rounded-full border-2 border-border bg-card px-5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:opacity-50"
            aria-label="Escribe tu pregunta"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white shadow-md transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Enviar mensaje"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
