import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { CONTACT, services } from "@/lib/site-data";
import lesbestMark from "@/assets/lesbest-mark.png";
import { LiquidLogo } from "@/components/effects/liquid-logo";
import { ChatWidget } from "@/components/chat-widget";

const links = [
  ["Home", "/"], ["Services", "/services"], ["About", "/about"],
  ["Portfolio", "/portfolio"], ["Blog", "/blog"], ["Estimate", "/quote"], ["Contact", "/contact"],
] as const;

function Wordmark({ light = false }: { light?: boolean }) {
  return <span className="flex flex-col leading-none">
    <span className={`font-display text-[1.9rem] tracking-tight ${light ? "text-primary-foreground" : "text-primary"}`}>LESBEST</span>
    <span className={`mt-1.5 text-[8.5px] font-semibold uppercase tracking-[0.26em] ${light ? "text-primary-foreground/70" : "text-secondary"}`}>Cleaning Services</span>
  </span>;
}

export function Mark({ light = false }: { light?: boolean }) {
  return <Link to="/" aria-label="Lesbest Cleaning Services home" className="inline-flex items-center gap-3">
    <img src={lesbestMark} alt="" className={`h-11 w-auto ${light ? "brightness-0 invert" : ""}`} />
    <Wordmark light={light} />
  </Link>;
}
function HeaderMark() {
  return <Link to="/" aria-label="Lesbest Cleaning Services home" className="inline-flex items-center gap-3"><LiquidLogo /><Wordmark /></Link>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, []);
  return <div className="min-h-screen bg-background">
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-18 max-w-[1500px] items-center justify-between px-5 md:px-10">
        <HeaderMark />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map(([label, to]) => <Link key={to} to={to} activeOptions={{ exact: to === "/" }} className="group relative py-2 text-[11px] font-semibold uppercase tracking-[0.13em] text-foreground/75 transition-colors hover:text-secondary" activeProps={{ className: "text-primary" }}>{label}<span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-secondary transition-transform group-hover:scale-x-100" /></Link>)}
        </nav>
        <div className="hidden lg:block"><Button asChild><Link to="/contact">Request a quote</Link></Button></div>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav className="border-t border-border bg-background px-5 py-7 lg:hidden">{links.map(([label, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="block border-b border-border py-4 font-display text-3xl">{label}</Link>)}<Button asChild className="mt-6 w-full"><Link to="/contact">Request a quote</Link></Button></nav>}
    </header>
    <main>{children}</main>
    <ChatWidget />
    <footer className="bg-primary px-5 py-16 text-primary-foreground md:px-10 md:py-24">
      <div className="mx-auto grid max-w-[1500px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5"><Mark light /><p className="mt-6 max-w-sm text-sm leading-7 text-primary-foreground/70">Professional cleaning, fumigation and property upkeep for homes, offices and commercial spaces in Uyo, Eket and nearby areas.</p></div>
        <div className="md:col-span-2"><FooterTitle>Navigate</FooterTitle>{links.map(([label,to]) => <Link key={to} to={to} className="mb-3 block text-sm text-primary-foreground/70 hover:text-accent">{label}</Link>)}</div>
        <div className="md:col-span-2"><FooterTitle>Services</FooterTitle>{services.map(x => <Link key={x.slug} to="/services/$serviceSlug" params={{ serviceSlug: x.slug }} className="mb-3 block text-sm text-primary-foreground/70 hover:text-accent">{x.name}</Link>)}</div>
        <div className="md:col-span-3"><FooterTitle>Contact</FooterTitle><p className="text-sm leading-7 text-primary-foreground/70"><a href={`tel:${CONTACT.phoneNumber}`} className="hover:text-accent">Call: {CONTACT.phoneDisplay}</a><br/><a href={`https://wa.me/${CONTACT.whatsappNumber}`} target="_blank" rel="noreferrer" className="hover:text-accent">WhatsApp: {CONTACT.whatsappDisplay}</a><br/><a href={`mailto:${CONTACT.email}`} className="hover:text-accent">{CONTACT.email}</a><br/>Uyo, Eket, Akwa Ibom and environs</p></div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1500px] flex-col gap-5 border-t border-primary-foreground/20 pt-8 md:flex-row md:items-end md:justify-between"><p className="font-display text-4xl md:text-6xl">Clean spaces. Properly cared for.</p><div className="text-[10px] uppercase tracking-[0.15em] text-primary-foreground/50"><p>© 2026 LESBEST</p><a href="https://clikconsult.com.ng" target="_blank" rel="noreferrer" className="mt-2 inline-block normal-case tracking-normal transition-colors hover:text-accent">Made with ❤️ by ClikConsult</a></div></div>
    </footer>
  </div>;
}

function FooterTitle({ children }: { children: ReactNode }) { return <h2 className="mb-5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">{children}</h2>; }
