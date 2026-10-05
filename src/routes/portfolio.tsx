import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PortfolioPage } from "@/components/pages";
export const Route=createFileRoute("/portfolio")({head:()=>seo({title:"Our Work — LESBEST",description:"Explore selected residential, commercial and specialist property-care projects.",ogDescription:"Exceptional results across beautifully considered spaces.",path:"/portfolio",image:"portfolio",imageAlt:"A Lesbest cleaner wiping a marble kitchen island in a modern Nigerian home"}),component:PortfolioPage});