import { Link } from "@tanstack/react-router";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowLink, Eyebrow, QuoteBand, SectionTitle } from "@/components/editorial";
import { services, whatsappEnquiry } from "@/lib/site-data";
import { serviceContent } from "@/lib/service-content";

const wrap = "mx-auto max-w-[1500px] px-5 md:px-10";
const section = "py-20 md:py-32";

export function ServiceDetailPage({ slug }: { slug: string }) {
  const index = services.findIndex((s) => s.slug === slug);
  const s = services[index];
  const c = serviceContent[slug];
  if (!s || !c) return null;
  const included = [...s.included, ...c.alsoIncluded];
  const others = [...services.slice(index + 1), ...services.slice(0, index)].slice(0, 3);

  return (
    <article>
      <section className={`${wrap} pt-10 pb-16 md:pt-16 md:pb-24`}>
        <nav aria-label="Breadcrumb" className="mb-10 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/services" className="hover:text-secondary">Services</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-foreground">{s.name}</span>
        </nav>
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <Eyebrow>0{index + 1} / Service</Eyebrow>
            <h1 className="text-6xl leading-[.95] md:text-8xl">{s.name}</h1>
            <p className="mt-8 font-display text-2xl leading-snug md:text-3xl">{c.headline}</p>
            <p className="mt-6 max-w-lg leading-8 text-muted-foreground">{s.short}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild><Link to="/quote" search={{ service: s.slug, type: "" }}>Estimate this service</Link></Button>
              <Button asChild variant="outline"><a href={whatsappEnquiry(s.name)} target="_blank" rel="noreferrer">Enquire on WhatsApp</a></Button>
            </div>
          </div>
          <div className="md:col-span-6">
            <img src={s.image} alt={s.imageAlt} style={{ objectPosition: s.imagePos }} className="aspect-[5/4] w-full object-cover" width={1600} height={1280} fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className={`${wrap} border-t border-border ${section}`}>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4"><Eyebrow>Overview</Eyebrow><h2 className="text-4xl leading-tight md:text-5xl">How we approach it</h2></div>
          <div className="space-y-6 md:col-span-7 md:col-start-6">{c.overview.map((p) => <p key={p} className="text-lg leading-9 text-muted-foreground">{p}</p>)}</div>
        </div>
      </section>

      <section className={`bg-card ${section}`}>
        <div className={`${wrap} grid gap-10 md:grid-cols-12`}>
          <div className="md:col-span-4"><Eyebrow>What is included</Eyebrow><h2 className="text-4xl leading-tight md:text-5xl">Every visit covers</h2></div>
          <ul className="grid gap-x-10 gap-y-5 md:col-span-7 md:col-start-6 md:grid-cols-2">
            {included.map((x) => <li key={x} className="flex gap-3 border-b border-border pb-4 text-sm leading-6"><Check className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />{x}</li>)}
          </ul>
        </div>
      </section>

      <section className={`${wrap} ${section}`}>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4"><Eyebrow>Who it is for</Eyebrow><h2 className="text-4xl leading-tight md:text-5xl">Built for</h2></div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="text-lg leading-9 text-muted-foreground">{s.suitable}.</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">{c.idealFor.map((x) => <li key={x} className="border border-border px-5 py-4 text-sm">{x}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={`bg-primary text-primary-foreground ${section}`}>
        <div className={wrap}>
          <div className="mb-12 max-w-2xl"><p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">How it works</p><h2 className="text-4xl leading-tight md:text-6xl">From first message to finished space</h2></div>
          <ol className="grid gap-px bg-primary-foreground/20 md:grid-cols-4">
            {c.steps.map((st, i) => (
              <li key={st.title} className="bg-primary p-7 md:p-8">
                <p className="font-display text-5xl text-accent">0{i + 1}</p>
                <h3 className="mt-6 text-2xl">{st.title}</h3>
                <p className="mt-3 text-sm leading-7 text-primary-foreground/70">{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${wrap} ${section}`}>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4"><Eyebrow>Questions</Eyebrow><h2 className="text-4xl leading-tight md:text-5xl">Good to know</h2></div>
          <div className="md:col-span-7 md:col-start-6">
            {c.faqs.map((f) => (
              <details key={f.q} className="group border-b border-border py-5 first:border-t">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="size-4 shrink-0 text-secondary transition-transform group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={`${wrap} pb-20 md:pb-32`}>
        <SectionTitle label="Continue exploring">Other services</SectionTitle>
        <div className="grid gap-x-7 gap-y-12 md:grid-cols-3">
          {others.map((o) => (
            <article key={o.slug} className="group">
              <Link to="/services/$serviceSlug" params={{ serviceSlug: o.slug }} className="block overflow-hidden">
                <img src={o.image} alt={o.imageAlt} style={{ objectPosition: o.imagePos }} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" width={1200} height={900} />
              </Link>
              <div className="mt-5 flex items-start justify-between gap-5 border-t border-border pt-4">
                <div><h3 className="text-3xl">{o.name}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{o.short}</p></div>
                <ArrowLink to="/services/$serviceSlug" params={{ serviceSlug: o.slug }}>Explore</ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <QuoteBand />
    </article>
  );
}
