import LiquidGlass from "liquid-glass-react";
import { MessageCircle, Send, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ClientOnly } from "@/components/effects/client-only";

type Message = { from: "bot" | "user"; text: string };

const STARTER: Message[] = [
  { from: "bot", text: "Hi, I'm the LESBEST assistant. Ask me about services, pricing or booking a visit." },
];

export function ChatWidget() {
  return (
    <ClientOnly>
      <ChatWidgetInner />
    </ClientOnly>
  );
}

function ChatWidgetInner() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(STARTER);
  const [draft, setDraft] = useState("");

  function send(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      { from: "user", text: draft },
      { from: "bot", text: "Thanks — this assistant isn't connected yet. A team member will follow up shortly." },
    ]);
    setDraft("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <LiquidGlass cornerRadius={20} blurAmount={0.1} saturation={140} aberrationIntensity={1} elasticity={0} displacementScale={22} padding="0">
          <div className="flex h-[420px] w-[320px] max-w-[82vw] flex-col overflow-hidden rounded-[20px]">
            <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
              <span className="font-display text-lg">LESBEST Assistant</span>
              <button aria-label="Close chat" onClick={() => setOpen(false)}><X size={18} /></button>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto bg-background/70 p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-snug ${
                    m.from === "bot"
                      ? "self-start border border-border bg-card text-card-foreground"
                      : "ml-auto bg-secondary text-secondary-foreground"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <form onSubmit={send} className="flex border-t border-border bg-background">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message…"
                aria-label="Message"
                className="flex-1 bg-transparent px-3 py-3 text-sm outline-none"
              />
              <button type="submit" aria-label="Send message" className="px-4 text-secondary"><Send size={18} /></button>
            </form>
          </div>
        </LiquidGlass>
      )}

      <LiquidGlass cornerRadius={999} blurAmount={0.08} saturation={130} aberrationIntensity={1.2} elasticity={0.15} displacementScale={20} padding="0" onClick={() => setOpen((o) => !o)}>
        <button
          aria-expanded={open}
          aria-label="Toggle chat assistant"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg"
        >
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </button>
      </LiquidGlass>
    </div>
  );
}
