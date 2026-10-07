import { Link } from "@tanstack/react-router";
import { MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { ClientOnly } from "@/components/effects/client-only";
import { CONTACT, services } from "@/lib/site-data";
import {
  LIMITS,
  localReply,
  welcomeReply,
  whatsappLink,
  type AssistantAction,
  type AssistantReply,
  type ChatTurn,
} from "@/lib/assistant";

type UiMessage = { id: string; from: "bot" | "user"; text: string; actions?: AssistantAction[]; suggestions?: string[] };
type Mode = "unknown" | "ai" | "guided";

const STORAGE_KEY = "lesbest-assistant-v1";
const ctx = { services, contact: CONTACT };
const uid = () => Math.random().toString(36).slice(2, 10);

const botMessage = (r: AssistantReply): UiMessage => ({ id: uid(), from: "bot", text: r.message, actions: r.actions, suggestions: r.suggestions });
const initial = (): UiMessage[] => [botMessage(welcomeReply())];
const toTurns = (m: UiMessage[]): ChatTurn[] => m.map((x) => ({ role: x.from === "user" ? "user" : "assistant", content: x.text }));

export function ChatWidget() {
  return (
    <ClientOnly>
      <ChatWidgetInner />
    </ClientOnly>
  );
}

function ChatWidgetInner() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>(initial);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("unknown");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const busy = useRef(false);

  // Restore the conversation for this browser tab.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "null") as { messages?: UiMessage[]; mode?: Mode } | null;
      if (saved?.messages?.length) setMessages(saved.messages);
      if (saved?.mode) setMode(saved.mode);
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages: messages.slice(-30), mode })); } catch { /* ignore */ }
  }, [messages, mode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => { const el = listRef.current; if (el) el.scrollTop = el.scrollHeight; }, [messages, loading, open]);

  const ask = useCallback(async (raw: string) => {
    const text = raw.trim().slice(0, LIMITS.userChars);
    if (!text || busy.current) return;
    busy.current = true;
    const next = [...messages, { id: uid(), from: "user" as const, text }];
    setMessages(next);
    setDraft("");
    setLoading(true);
    const turns = toTurns(next);
    let reply: AssistantReply | null = null;
    let nextMode: Mode = mode;

    if (mode !== "guided") {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: turns }),
          ...(typeof AbortSignal.timeout === "function" ? { signal: AbortSignal.timeout(25_000) } : {}),
        });
        if (res.ok) {
          const data = (await res.json()) as { reply?: AssistantReply };
          if (data.reply?.message) { reply = data.reply; nextMode = "ai"; }
        } else if (res.status === 503) {
          nextMode = "guided"; // not configured: stop trying for this session
        }
      } catch { /* network or timeout: fall back below */ }
    }

    if (!reply) {
      await new Promise((r) => setTimeout(r, 350));
      reply = localReply(text, turns.slice(0, -1), ctx);
    }
    setMode(nextMode);
    setMessages((m) => [...m, botMessage(reply as AssistantReply)]);
    setLoading(false);
    busy.current = false;
  }, [messages, mode]);

  function onSubmit(e: FormEvent) { e.preventDefault(); void ask(draft); }
  function reset() { setMessages(initial()); setLoading(false); busy.current = false; }

  const last = messages[messages.length - 1];
  const pill = "inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-secondary hover:text-secondary";

  function renderAction(a: AssistantAction, i: number) {
    const close = () => setOpen(false);
    switch (a.type) {
      case "service": return <Link key={i} to="/services/$serviceSlug" params={{ serviceSlug: a.slug }} onClick={close} className={pill}>{a.label}</Link>;
      case "quote": return <Link key={i} to="/quote" search={{ service: a.slug ?? "", type: "" }} onClick={close} className={pill}>{a.label}</Link>;
      case "page": return <Link key={i} to={a.to} onClick={close} className={pill}>{a.label}</Link>;
      case "whatsapp": {
        const body = a.summary ? `Hello LESBEST, I was chatting with your website assistant. ${a.summary}` : "Hello LESBEST, I'd like to enquire about your services.";
        return <a key={i} href={whatsappLink(CONTACT, body)} target="_blank" rel="noopener noreferrer" className={pill}>{a.label}</a>;
      }
      case "call": return <a key={i} href={`tel:+${CONTACT.whatsappNumber}`} className={pill}>{a.label}</a>;
    }
  }

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with the LESBEST assistant"
          className="flex h-[min(78dvh,560px)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[20px] border border-border/60 bg-background/95 shadow-2xl backdrop-blur-xl backdrop-saturate-150"
        >
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div>
              <p className="font-display text-lg leading-none">LESBEST Assistant</p>
              <p className="mt-1 text-[11px] text-primary-foreground/70">Services, estimates and booking</p>
            </div>
            <div className="flex items-center gap-3">
              <button aria-label="Start a new conversation" onClick={reset}><RotateCcw size={16} /></button>
              <button aria-label="Close chat" onClick={() => setOpen(false)}><X size={18} /></button>
            </div>
          </div>

          <div ref={listRef} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m) => (
              <div key={m.id} className={`chat-in ${m.from === "user" ? "flex justify-end" : "flex justify-start"}`}>
                <div className="max-w-[88%]">
                  <div className={`whitespace-pre-line rounded-lg px-3 py-2 text-sm leading-snug ${m.from === "bot" ? "border border-border bg-card text-card-foreground" : "bg-secondary text-secondary-foreground"}`}>{m.text}</div>
                  {m.from === "bot" && m.actions && m.actions.length > 0 && <div className="mt-2 flex flex-wrap gap-2">{m.actions.map(renderAction)}</div>}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start" aria-label="The assistant is typing">
                <div className="flex gap-1 rounded-lg border border-border bg-card px-3 py-3">
                  {[0, 1, 2].map((d) => <span key={d} className="typing-dot size-1.5 rounded-full bg-muted-foreground" style={{ animationDelay: `${d * 150}ms` }} />)}
                </div>
              </div>
            )}
            {!loading && last?.from === "bot" && last.suggestions && last.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {last.suggestions.map((s, k) => <button key={s} type="button" onClick={() => void ask(s)} style={{ "--d": `${k * 70}ms` } as React.CSSProperties} className={`chat-in ${pill} bg-transparent`}>{s}</button>)}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex border-t border-border bg-background/90">
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={LIMITS.userChars}
              placeholder="Type a message…"
              aria-label="Message"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base outline-none md:text-sm"
            />
            <button type="submit" disabled={loading || !draft.trim()} aria-label="Send message" className="px-4 text-secondary disabled:opacity-40"><Send size={18} /></button>
          </form>
          <p className="border-t border-border/60 px-3 py-2 text-[10px] leading-4 text-muted-foreground">
            {mode === "ai" ? "AI assistant. Answers can be imperfect, so our team confirms details and pricing." : "Guided assistant. For anything else, message our team on WhatsApp."}
          </p>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className={`${open ? "" : "launcher-pulse"} flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_10px_30px_rgba(46,30,29,.35)] ring-1 ring-white/30 transition-transform hover:scale-105 active:scale-95`}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
