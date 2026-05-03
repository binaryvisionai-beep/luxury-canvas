import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, X, Send, Mic } from "lucide-react";
import { sendChat } from "@/server/chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

const orbGradient =
  "radial-gradient(circle at 30% 30%, oklch(0.85 0.18 320) 0%, oklch(0.7 0.22 350) 35%, oklch(0.65 0.2 30) 70%, oklch(0.78 0.16 75) 100%)";

function Orb({ size = 28 }: { size?: number }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.06, 1], filter: ["hue-rotate(0deg)", "hue-rotate(15deg)", "hue-rotate(0deg)"] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      className="relative shrink-0 rounded-full"
      style={{
        width: size,
        height: size,
        background: orbGradient,
        boxShadow: "0 6px 18px -4px oklch(0.6 0.2 340 / 0.55), inset -4px -6px 12px oklch(0 0 0 / 0.18), inset 4px 4px 10px oklch(1 0 0 / 0.25)",
      }}
    >
      <span
        className="absolute bg-white rounded-full"
        style={{ width: size * 0.09, height: size * 0.18, top: size * 0.36, left: size * 0.32, transform: "rotate(-18deg)", borderRadius: "40% 40% 50% 50%" }}
      />
      <span
        className="absolute bg-white rounded-full"
        style={{ width: size * 0.09, height: size * 0.18, top: size * 0.36, right: size * 0.32, transform: "rotate(18deg)", borderRadius: "40% 40% 50% 50%" }}
      />
    </motion.div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-2 w-2 rounded-full"
          style={{ background: i === 0 ? "oklch(0.7 0.22 320)" : i === 1 ? "oklch(0.7 0.22 350)" : "oklch(0.75 0.18 60)" }}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hello! I'm Shivers Assistant. How may I help you plan your stay, dining, or event today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await sendChat({ data: { messages: next } });
      const reply = "error" in res && res.error ? res.error : (res as { content: string }).content;
      setMessages((m) => [...m, { role: "assistant", content: reply || "Sorry, I couldn't respond." }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            key="trigger"
            onClick={() => setOpen(true)}
            aria-label="Open chat"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="fixed z-50 grid place-items-center rounded-full text-white"
            style={{
              bottom: 24,
              right: 88,
              width: 56,
              height: 56,
              background: "oklch(0.65 0.16 155)",
              boxShadow: "0 10px 30px -8px oklch(0.55 0.18 155 / 0.55)",
            }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                animation: "chat-pulse 2.4s ease-in-out infinite",
                boxShadow: "0 0 0 0 oklch(0.65 0.16 155 / 0.55)",
              }}
            />
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.6, y: 80, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 60 }}
            transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.9 }}
            className="fixed z-50 flex flex-col overflow-hidden bg-white border"
            style={{
              bottom: 24,
              right: 24,
              width: 350,
              height: 550,
              borderRadius: 32,
              borderColor: "oklch(0.92 0.012 80)",
              boxShadow: "0 30px 80px -20px oklch(0 0 0 / 0.25), 0 8px 30px -10px oklch(0 0 0 / 0.15)",
              transformOrigin: "bottom right",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "oklch(0.95 0.01 80)" }}>
              <div className="flex items-center gap-3">
                <Orb size={32} />
                <div>
                  <div className="font-serif text-base font-semibold text-ink">Shivers Assistant</div>
                  <div className="text-[11px] text-ink-soft">Online · Concierge AI</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-[oklch(0.95_0.02_75)]"
                style={{ color: "var(--gold-deep)" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ scrollBehavior: "smooth" }}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && <Orb size={24} />}
                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                      m.role === "user" ? "text-white rounded-br-md" : "text-ink rounded-bl-md"
                    }`}
                    style={
                      m.role === "user"
                        ? { background: "var(--gradient-gold)" }
                        : { background: "oklch(0.97 0.01 80)" }
                    }
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-2 justify-start"
                >
                  <Orb size={24} />
                  <div className="rounded-2xl rounded-bl-md" style={{ background: "oklch(0.97 0.01 80)" }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 border-t" style={{ borderColor: "oklch(0.95 0.01 80)" }}>
              <div className="flex items-center gap-2 rounded-full border px-4 py-2" style={{ borderColor: "oklch(0.92 0.012 80)", background: "oklch(0.98 0.005 80)" }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Message..."
                  className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink-soft"
                />
                <button aria-label="Voice input" className="text-ink-soft hover:text-[var(--gold-deep)] transition-colors">
                  <Mic size={18} />
                </button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={send}
                  aria-label="Send"
                  className="grid h-8 w-8 place-items-center rounded-full text-white"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <Send size={15} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes chat-pulse {
          0% { box-shadow: 0 0 0 0 oklch(0.65 0.16 155 / 0.5); }
          70% { box-shadow: 0 0 0 18px oklch(0.65 0.16 155 / 0); }
          100% { box-shadow: 0 0 0 0 oklch(0.65 0.16 155 / 0); }
        }
      `}</style>
    </>
  );
}
