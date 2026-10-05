import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { AboutPage } from "@/components/pages";
export const Route=createFileRoute("/about")({head:()=>seo({title:"Our Story & Standard — LESBEST",description:"Discover the care, professionalism and philosophy behind LESBEST.",ogDescription:"A better way to care for your space.",path:"/about",image:"about",imageAlt:"A wide luxury living room with polished marble floors and a view of palm trees"}),component:AboutPage});