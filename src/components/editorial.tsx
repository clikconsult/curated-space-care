import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeftRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { images, photos, whatsappEnquiry } from "@/lib/site-data";
import { useState } from "react";
import beforeLivingroom from "@/assets/lesbest-before-livingroom.webp";
import afterLivingroom from "@/assets/lesbest-after-livingroom.webp";

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={`mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] ${light ? "text-secondary" : "text-secondary"}`}>{children}</p>; }

export function PageHero({ title, subtitle, image = images.living, alt = "Immaculately presented premium interior" }: { title: React.ReactNode; subtitle: string; image?: string; alt?: string }) { return <section className="relative min-h-[46vh] overflow-hidden bg-primary text-primary-foreground md:min-h-[72vh]"><img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover opacity-55 image-reveal" width={1920} height={1280}/><div className="absolute inset-0 bg-primary/35"/><div className="relative mx-auto flex min-h-[46vh] max-w-[1500px] flex-col justify-end px-5 pb-10 md:min-h-[72vh] md:px-10 md:pb-24"><h1 className="max-w-5xl text-6xl leading-[.88] md:text-8xl lg:text-[9.5rem]">{title}</h1><p className="mt-7 max-w-xl text-sm leading-7 text-primary-foreground/85 md:text-base">{subtitle}</p></div></section>; }

export function SectionTitle({ label, children, action }: { label?: string; children: React.ReactNode; action?: React.ReactNode }) { return <div className="mb-10 flex items-end justify-between gap-8 border-t border-border pt-5 md:mb-16"><div>{label && <Eyebrow>{label}</Eyebrow>}<h2 className="max-w-4xl text-5xl leading-[.95] md:text-7xl">{children}</h2></div>{action}</div>; }

export function ArrowLink({ to, children, params }: { to: string; children: React.ReactNode; params?: Record<string,string> }) { return <Link to={to} params={params as never} className="group inline-flex items-center gap-3 border-b border-current pb-2 text-[10px] font-semibold uppercase tracking-[0.15em]"><span>{children}</span><ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></Link>; }

export function QuoteBand({ image = photos.closingLiving.src, alt = "Refined interior maintained by LESBEST" }: { image?: string; alt?: string }) { return <section className="relative min-h-[72vh] overflow-hidden text-primary-foreground"><img src={image} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1280}/><div className="absolute inset-0 bg-primary/55"/><div className="relative mx-auto flex min-h-[72vh] max-w-[1500px] flex-col items-start justify-end px-5 pb-16 md:px-10 md:pb-24"><h2 className="max-w-4xl text-6xl leading-[.9] md:text-8xl">Your space deserves<br/><em className="text-accent">a higher standard.</em></h2><div className="mt-9 flex flex-wrap gap-3"><Button asChild className="bg-primary-foreground text-primary hover:bg-accent"><Link to="/contact">Request a quote</Link></Button><Button asChild variant="light"><a href={whatsappEnquiry()} target="_blank" rel="noreferrer">WhatsApp us</a></Button></div></div></section>; }

export function BeforeAfter() {
  const [value, setValue] = useState(58);
  const [touched, setTouched] = useState(false);
  const dismiss = () => setTouched(true);
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-muted select-none md:aspect-[16/9]">
      <img src={beforeLivingroom} alt="A newly built living room and kitchen before Lesbest's post-construction clean, with a dust-covered floor" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[center_35%]" width={1200} height={896} />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${value}%` }}>
        <img src={afterLivingroom} alt="The same living room and kitchen after Lesbest's post-construction clean, with the floor polished to a mirror finish" loading="lazy" className="h-full max-w-none object-cover object-[center_35%]" style={{ width: "calc(100vw - 40px)", maxWidth: "1500px" }} width={1200} height={896} />
      </div>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-primary-foreground shadow-[0_0_0_1px_rgba(0,0,0,.15)]" style={{ left: `${value}%` }} />
      <div
        className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-full bg-primary-foreground text-primary shadow-lg"
        style={{ left: `${value}%` }}
      >
        <ChevronLeft size={14} className="-mr-1" /><ChevronRight size={14} className="-ml-1" />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 bg-primary px-3 py-2 text-[10px] uppercase tracking-[.14em] text-primary-foreground">After</span>
      <span className="pointer-events-none absolute right-4 top-4 bg-primary px-3 py-2 text-[10px] uppercase tracking-[.14em] text-primary-foreground">Before</span>

      {!touched && (
        <span className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 animate-pulse items-center gap-2 whitespace-nowrap rounded-full bg-primary/90 px-4 py-2 text-[11px] uppercase tracking-[.1em] text-primary-foreground">
          <ArrowLeftRight size={13} /> Drag to compare
        </span>
      )}

      <input
        aria-label="Compare before and after"
        type="range" min="5" max="95" value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        onPointerDown={dismiss} onTouchStart={dismiss} onKeyDown={dismiss}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}