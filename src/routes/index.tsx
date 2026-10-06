import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo({ title: "Cleaning Services in Uyo & Eket | LESBEST", description: "Professional home, office, commercial and deep cleaning services in Uyo, Eket, Akwa Ibom and surrounding areas.", ogDescription: "Professional cleaning and property care for homes and businesses in Akwa Ibom.", path: "/", image: "home", imageAlt: "Three uniformed Lesbest cleaners with floor-care equipment in a living room" }),
  component: HomePage,
});
