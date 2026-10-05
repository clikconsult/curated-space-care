import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { ArticlePage } from "@/components/pages";
import { articles } from "@/lib/site-data";
export const Route=createFileRoute("/blog_/$articleId")({head:({params})=>{const a=articles.find(x=>x.slug===params.articleId);const title=a?`${a.title} — LESBEST Journal`:`Journal — LESBEST`;const description=a?.excerpt??"Property-care insight from LESBEST.";const ogImages:Record<string,string>={"quiet-art-of-property-care":"journal-quiet-art","rainy-season-care":"journal-rainy-season","workplace-standard":"journal-workplace","guest-ready-home":"journal-guest-ready"};return seo({title,description,path:`/blog/${params.articleId}`,image:(a&&ogImages[a.slug])||"blog",imageAlt:a?.imageAlt??"A double-height duplex living room with polished floors and garden views",type:"article"});},component:ArticleRoute});
function ArticleRoute(){const {articleId}=Route.useParams();return <ArticlePage slug={articleId}/>}