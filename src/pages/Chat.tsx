import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { callGemini } from "@/utils/gemini";

interface Message {
  role: "user" | "bot";
  text: string;
  isError?: boolean;
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
    } catch {
      setRetryMessage(text.trim());
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "😅 Ups, tuve un problema técnico. ¿Puedes intentar de nuevo?",
          isError: true,
        },
      ]);
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
    <div className="flex h-screen flex-col bg-[#F8FAFC]">
      {/* Header */}
      <header className="shrink-0 border-b border-[#E2E8F0] bg-white/80 backdrop-blur-md px-4 py-4">
        <div className="mx-auto flex max-w-[800px] items-center gap-3">
          <Link
            to="/"
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#0EA5E9] hover:bg-[#F0F9FF] transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold text-[#1E293B]">💬 Pregúntale a MiTramite</h1>
            <p className="text-sm text-[#64748B]">Tu asistente de trámites mexicanos 24/7</p>
          </div>
          <div className="w-8" />
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto max-w-[800px] space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "bot" && (
                <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#059669] text-sm">
                  🤖
                </div>
              )}
              <div
                className={
                  msg.role === "user"
                    ? "max-w-[80%] rounded-[16px_16px_4px_16px] bg-gradient-to-br from-[#0EA5E9] to-[#059669] px-4 py-3 text-white"
                    : `max-w-[85%] rounded-[16px_16px_16px_4px] border border-[#E2E8F0] bg-white px-4 py-4 text-[#1E293B] ${msg.isError ? "border-amber-300 bg-amber-50" : ""}`
                }
              >
                {msg.role === "bot" ? (
                  <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-strong:text-[#1E293B]">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                    {msg.isError && (
                      <button
                        onClick={handleRetry}
                        className="mt-2 rounded-full border border-[#0EA5E9] px-4 py-1.5 text-sm font-medium text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-colors"
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

          {isLoading && (
            <div className="flex justify-start">
              <div className="mr-2 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#059669] text-sm">
                🤖
              </div>
              <div className="rounded-[16px_16px_16px_4px] border border-[#E2E8F0] bg-white px-5 py-4">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#0EA5E9]" style={{ animationDelay: "0ms" }} />
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#0EA5E9]" style={{ animationDelay: "150ms" }} />
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#0EA5E9]" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chips + Input */}
      <div className="shrink-0 border-t border-[#E2E8F0] bg-white">
        {showChips && (
          <div className="mx-auto max-w-[800px] overflow-x-auto px-4 pt-3 pb-1">
            <div className="flex gap-2 whitespace-nowrap">
              {SUGGESTION_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  className="shrink-0 rounded-full border border-[#E2E8F0] bg-[#F0F9FF] px-4 py-2 text-sm text-[#0EA5E9] transition-colors hover:bg-[#0EA5E9] hover:text-white"
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
            className="flex-1 h-12 rounded-full border-2 border-[#E2E8F0] bg-white px-5 text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#0EA5E9] focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#059669] text-white shadow-md transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
