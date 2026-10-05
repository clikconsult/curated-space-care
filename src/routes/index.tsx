import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo({ title: "LESBEST — A Higher Standard of Clean", description: "Premium cleaning and property-care services for exceptional homes, workplaces and hospitality spaces.", ogDescription: "Meticulous property care for spaces that demand exceptional standards.", path: "/", image: "home", imageAlt: "Three uniformed Lesbest cleaners with floor-care equipment in a luxury living room" }),
  component: HomePage,
});
