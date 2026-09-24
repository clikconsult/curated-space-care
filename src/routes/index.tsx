import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "LESBEST — A Higher Standard of Clean" },
    { name: "description", content: "Premium cleaning and property-care services for exceptional homes, workplaces and hospitality spaces." },
    { property: "og:title", content: "LESBEST — A Higher Standard of Clean" },
    { property: "og:description", content: "Meticulous property care for spaces that demand exceptional standards." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: HomePage,
});
