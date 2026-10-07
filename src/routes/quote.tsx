import { createFileRoute } from "@tanstack/react-router";
import { stagger } from "@/lib/motion";
import { QuoteEstimator } from "@/components/quote-estimator";
import { Eyebrow } from "@/components/editorial";
import { seo } from "@/lib/seo";

const wrap = "mx-auto max-w-[1500px] px-5 md:px-10";

export const Route = createFileRoute("/quote")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search["service"] === "string" ? search["service"] : "",
    type: typeof search["type"] === "string" ? search["type"] : "",
  }),
  head: () =>
    seo({
      title: "Instant Estimate — LESBEST Property Care",
      description:
        "Build an indicative estimate for cleaning and property care in Uyo, Eket, Akwa Ibom and surrounding areas, then send it straight to the team.",
      ogDescription: "Set the property, service and rhythm. See an indicative range, then send it to us.",
      path: "/quote",
      image: "quote",
      imageAlt: "A calm marble living room with palm trees outside the sliding doors",
    }),
  component: QuotePage,
});

function QuotePage() {
  const { service, type } = Route.useSearch();
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className={`${wrap} grid gap-10 py-16 md:grid-cols-12 md:items-end md:py-24`}>
          <div className="md:col-span-7">
            <Eyebrow>Build your estimate</Eyebrow>
            <h1 className="text-6xl leading-[0.88] md:text-8xl">
              Know the investment
              <br />
              <em className="text-secondary">before you ask.</em>
            </h1>
          </div>
          <p data-reveal="up" style={stagger(0, 0, 200)} className="max-w-md text-base leading-8 text-muted-foreground md:col-span-4 md:col-start-9">
            Choose the property, the service and the rhythm. We show an indicative range as you
            go, then pass the full brief to the team in one message.
          </p>
        </div>
      </section>

      <section className={`${wrap} pt-14 pb-8 md:pt-24 md:pb-14`}>
        <QuoteEstimator initialService={service} initialProperty={type} />
      </section>

      <section className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className={`${wrap} grid gap-10 md:grid-cols-12 md:items-end`}>
          <div data-reveal="up" className="md:col-span-8">
            <h2 className="text-4xl leading-[0.95] md:text-6xl">
              Every figure above is a guide. The review is what makes it exact.
            </h2>
          </div>
          <p data-reveal="up" style={stagger(0, 0, 200)} className="max-w-sm text-sm leading-7 text-primary-foreground/70 md:col-span-3 md:col-start-10">
            A walk-through takes fifteen minutes. We look at materials, traffic and the finish you
            expect, then confirm a firm price in writing.
          </p>
        </div>
      </section>
    </>
  );
}
