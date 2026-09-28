import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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

  // One fixed column pinned to the bottom-right corner. The panel and the button
  // are normal flex children, so the panel's right edge always lines up with the
  // button — on every screen size — with no per-element offsets to drift apart.
  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with the LESBEST assistant"
          className="flex h-[min(70dvh,480px)] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[20px] border border-border/60 bg-background/85 shadow-2xl backdrop-blur-xl backdrop-saturate-150"
        >
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <span className="font-display text-lg">LESBEST Assistant</span>
            <button aria-label="Close chat" onClick={() => setOpen(false)}><X size={18} /></button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-snug ${
                  m.from === "bot"
                    ? "border border-border bg-card text-card-foreground"
                    : "ml-auto bg-secondary text-secondary-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={send} className="flex border-t border-border bg-background/90">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
              aria-label="Message"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base outline-none md:text-sm"
            />
            <button type="submit" aria-label="Send message" className="px-4 text-secondary"><Send size={18} /></button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_10px_30px_rgba(46,30,29,.35)] ring-1 ring-white/30 transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
