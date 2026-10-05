import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { BlogPage } from "@/components/pages";
export const Route=createFileRoute("/blog")({head:()=>seo({title:"The Journal — LESBEST",description:"Insights on cleaning, property care and maintaining exceptional spaces.",ogDescription:"Ideas and expertise for maintaining exceptional spaces.",path:"/blog",image:"blog",imageAlt:"A double-height duplex living room with polished floors and garden views"}),component:BlogPage});