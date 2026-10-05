import { createFileRoute, notFound } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/service-page";
import { SITE_NAME, SITE_URL, seo } from "@/lib/seo";
import { services } from "@/lib/site-data";
import { serviceContent } from "@/lib/service-content";

const AREAS = ["Uyo", "Akwa Ibom State", "Calabar", "Port Harcourt"];

export const Route = createFileRoute("/services_/$serviceSlug")({
  loader: ({ params }) => {
    if (!services.some((s) => s.slug === params.serviceSlug) || !serviceContent[params.serviceSlug]) throw notFound();
    return null;
  },
  head: ({ params }) => {
    const s = services.find((x) => x.slug === params.serviceSlug);
    const c = serviceContent[params.serviceSlug];
    if (!s || !c) return seo({ title: `Services — ${SITE_NAME}`, description: "Premium cleaning and property-care services.", path: "/services", image: "services", imageAlt: "A Lesbest cleaner at work in a luxury Nigerian home" });
    const path = `/services/${s.slug}`;
    const base = seo({
      title: `${s.name} in Uyo & Akwa Ibom — ${SITE_NAME}`,
      description: `${s.short} ${c.headline}`.slice(0, 200),
      ogDescription: s.short,
      path,
      image: `service-${s.slug}`,
      imageAlt: s.imageAlt,
    });
    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: s.name,
          description: s.short,
          url: `${SITE_URL}${path}`,
          image: `${SITE_URL}/og/service-${s.slug}.jpg`,
          areaServed: AREAS.map((name) => ({ "@type": "Place", name })),
          provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        },
        {
          "@type": "FAQPage",
          mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        },
      ],
    };
    return { ...base, scripts: [{ type: "application/ld+json", children: JSON.stringify(graph) }] };
  },
  component: ServiceRoute,
});

function ServiceRoute() {
  const { serviceSlug } = Route.useParams();
  return <ServiceDetailPage slug={serviceSlug} />;
}
