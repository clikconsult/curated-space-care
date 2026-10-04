import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/editorial";
import {
  SIZE,
  addOns,
  buildEstimate,
  estimateWhatsAppLink,
  formatNaira,
  frequencies,
  propertyTypes,
} from "@/lib/quote";
import { services } from "@/lib/site-data";

type Option = { slug: string; label: string; note?: string };

function OptionList({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: readonly Option[];
  value: string;
  onChange: (slug: string) => void;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
        {legend}
      </legend>
      <div className="grid gap-x-8 md:grid-cols-2">
        {options.map((option) => {
          const active = option.slug === value;
          return (
            <button
              key={option.slug}
              type="button"
              onClick={() => onChange(option.slug)}
              aria-pressed={active}
              className={`group flex items-baseline gap-3 border-b border-border py-4 text-left transition-colors ${
                active ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              <span
                aria-hidden
                className={`mt-1 h-px w-5 shrink-0 transition-all duration-300 ${
                  active ? "bg-secondary" : "bg-border group-hover:bg-secondary"
                }`}
              />
              <span>
                <span className="block text-lg leading-tight md:text-xl">{option.label}</span>
                {option.note && (
                  <span className="mt-1 block text-[11px] leading-5 text-muted-foreground">
                    {option.note}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function QuoteEstimator({
  initialService = "",
  initialProperty = "",
}: {
  initialService?: string;
  initialProperty?: string;
}) {
  const [propertySlug, setPropertySlug] = useState(
    propertyTypes.some((p) => p.slug === initialProperty) ? initialProperty : "residence",
  );
  const [serviceSlug, setServiceSlug] = useState(
    services.some((s) => s.slug === initialService) ? initialService : "deep-cleaning",
  );
  const [sqm, setSqm] = useState<number>(SIZE.initial);
  const [frequencySlug, setFrequencySlug] = useState<string>("fortnightly");
  const [addOnSlugs, setAddOnSlugs] = useState<string[]>([]);

  const estimate = useMemo(
    () => buildEstimate({ propertySlug, serviceSlug, sqm, frequencySlug, addOnSlugs }),
    [propertySlug, serviceSlug, sqm, frequencySlug, addOnSlugs],
  );

  const input = { propertySlug, serviceSlug, sqm, frequencySlug, addOnSlugs };

  function toggleAddOn(slug: string) {
    setAddOnSlugs((current) =>
      current.includes(slug) ? current.filter((x) => x !== slug) : [...current, slug],
    );
  }

  return (
    <div className="grid gap-14 md:grid-cols-12 md:gap-10">
      <div className="space-y-14 md:col-span-7">
        <OptionList
          legend="01 / The property"
          options={propertyTypes}
          value={propertySlug}
          onChange={setPropertySlug}
        />

        <OptionList
          legend="02 / The service"
          options={services.map((s) => ({ slug: s.slug, label: s.name, note: s.short }))}
          value={serviceSlug}
          onChange={setServiceSlug}
        />

        <div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
            03 / The size
          </p>
          <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
            <p className="font-display text-5xl leading-none md:text-6xl">
              {sqm}
              <span className="ml-2 font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground">
                square metres
              </span>
            </p>
            <p className="text-[11px] font-medium leading-5 text-foreground/65">
              Roughly {sqm < 90 ? "one bedroom" : `${Math.max(1, Math.round(sqm / 60))} bedrooms`}
            </p>
          </div>
          <input
            type="range"
            min={SIZE.min}
            max={SIZE.max}
            step={SIZE.step}
            value={sqm}
            onChange={(e) => setSqm(Number(e.target.value))}
            aria-label="Approximate floor area in square metres"
            className="estimate-slider mt-6 w-full"
          />
          <div className="mt-3 flex justify-between text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/60">
            <span>{SIZE.min} m²</span>
            <span>{SIZE.max} m² and above</span>
          </div>
        </div>

        <OptionList
          legend="04 / The rhythm"
          options={frequencies}
          value={frequencySlug}
          onChange={setFrequencySlug}
        />

        <fieldset className="border-0 p-0">
          <legend className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
            05 / Considered extras
          </legend>
          <div className="grid gap-x-8 md:grid-cols-2">
            {addOns.map((extra) => {
              const active = addOnSlugs.includes(extra.slug);
              return (
                <button
                  key={extra.slug}
                  type="button"
                  role="checkbox"
                  aria-checked={active}
                  onClick={() => toggleAddOn(extra.slug)}
                  className="group flex items-baseline gap-3 border-b border-border py-4 text-left"
                >
                  <span
                    aria-hidden
                    className={`mt-2 h-px shrink-0 transition-all duration-300 ${
                      active ? "w-8 bg-secondary" : "w-4 bg-border group-hover:bg-secondary"
                    }`}
                  />
                  <span className={`flex-1 text-base transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}>
                    {extra.label}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-foreground/55">
                    +{formatNaira(extra.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <aside className="md:col-span-4 md:col-start-9">
        <div className="border-t border-primary pt-6 md:sticky md:top-28">
          <Eyebrow>Indicative investment</Eyebrow>
          <p aria-live="polite" className="font-display text-5xl leading-[0.95] md:text-6xl">
            {estimate.recurring
              ? `${formatNaira(estimate.monthlyLow)}`
              : `${formatNaira(estimate.visitLow)}`}
            <span className="text-secondary"> — </span>
            {estimate.recurring
              ? `${formatNaira(estimate.monthlyHigh)}`
              : `${formatNaira(estimate.visitHigh)}`}
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {estimate.recurring ? "per month" : "for the visit"}
          </p>

          <dl className="mt-9 border-t border-border pt-5 text-sm leading-7">
            {[
              ["Property", estimate.propertyLabel],
              ["Service", estimate.serviceLabel],
              ["Floor area", `${sqm} m²`],
              ["Frequency", estimate.frequencyLabel],
              ["Extras", estimate.extrasTotal ? formatNaira(estimate.extrasTotal) + " per visit" : "None"],
            ].map(([term, detail]) => (
              <div key={term} className="flex items-baseline justify-between gap-5 border-b border-border/70 py-2">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{term}</dt>
                <dd className="text-right">{detail}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3">
            <Button asChild size="lg" className="w-full">
              <a href={estimateWhatsAppLink(input)} target="_blank" rel="noreferrer">
                Send this estimate on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/contact">Request a firm quote</Link>
            </Button>
          </div>

          <p className="mt-6 text-[11px] leading-6 text-muted-foreground">
            A guide, not a quotation. Final pricing follows a short site review, and standing
            programmes are confirmed in writing before the first visit.
          </p>
        </div>
      </aside>
    </div>
  );
}
