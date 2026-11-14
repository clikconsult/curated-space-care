import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, isoDate } from "@/lib/seo";
import { articles, services } from "@/lib/site-data";

// Sitemap generated from site-data so new services and articles appear automatically.
// /portfolio is left out until projects exist (it would be a thin page).
const STATIC_PATHS = ["/", "/services", "/about", "/quote", "/contact", "/blog"];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function entry(path: string, lastmod?: string) {
  return `  <url><loc>${esc(SITE_URL + path)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          ...STATIC_PATHS.map((p) => entry(p)),
          ...services.map((s) => entry(`/services/${s.slug}`)),
          ...articles.map((a) => entry(`/blog/${a.slug}`, isoDate(a.date))),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
        return new Response(xml, {
          headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" },
        });
      },
    },
  },
});
