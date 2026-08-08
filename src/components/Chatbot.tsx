import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Bot, Loader2, AlertTriangle } from "lucide-react";
import { stats, employees, departments } from "../data/mockData";

type Msg = { role: "user" | "assistant"; content: string };

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
const GROQ_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are the in-app HR assistant for Siegecode HRM. You help the logged-in HR admin quickly answer questions about the company's workforce, attendance, leave, payroll, and general HR policy questions. Be concise and friendly.

Here is a live snapshot of the current workspace data you can refer to when relevant:
- Total employees: ${stats.totalEmployees}
- Present today: ${stats.presentToday}
- On leave: ${stats.onLeave}
- Pending requests: ${stats.pendingRequests}
- Departments: ${departments.map((d) => `${d.name} (${d.employees} employees, head: ${d.head})`).join("; ")}
- Sample employee roster includes people like: ${employees.slice(0, 5).map((e) => `${e.name} (${e.role}, ${e.department})`).join("; ")}

If asked something outside this data, answer using general HR best-practice knowledge. Keep answers short unless asked for detail.`;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi Admin 👋 I'm your HR assistant. Ask me about employees, attendance, leave, or payroll." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setError(null);
    const nextMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setLoading(true);

    if (!GROQ_API_KEY) {
      setLoading(false);
      setError(
        "No Groq API key found. Add VITE_GROQ_API_KEY to your .env file (see README) and restart the dev server."
      );
      return;
    }

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...nextMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
          temperature: 0.4,
          max_tokens: 600,
        }),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Groq API error (${res.status}): ${errBody.slice(0, 200)}`);
      }

      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e: any) {
      setError(e?.message || "Something went wrong talking to Groq.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
        aria-label="Open HR chatbot"
      >
        {open ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-[380px] h-[520px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
          <div className="bg-brand-600 text-white px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <Bot size={19} />
            </div>
            <div>
              <p className="font-semibold text-[14.5px] leading-tight">HR Assistant</p>
              <p className="text-[12px] text-white/70 leading-tight">Powered by Groq</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13.5px] leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-brand-600 text-white rounded-br-sm"
                      : "bg-white border border-gray-100 text-gray-700 rounded-bl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-3.5 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-2 text-gray-400 text-[13px]">
                  <Loader2 size={14} className="animate-spin" /> Thinking...
                </div>
              </div>
            )}
            {error && (
              <div className="flex items-start gap-2 bg-orange-50 text-orange-600 text-[12.5px] px-3 py-2.5 rounded-xl">
                <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-gray-100 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about employees, leave, payroll..."
              className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-[13.5px] outline-none focus:ring-2 focus:ring-brand-100"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white flex items-center justify-center flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
