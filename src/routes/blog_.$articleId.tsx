import { createFileRoute } from "@tanstack/react-router";
import { ArticlePage } from "@/components/pages";
import { articles } from "@/lib/site-data";
export const Route=createFileRoute("/blog_/$articleId")({head:({params})=>{const a=articles.find(x=>x.slug===params.articleId);const title=a?`${a.title} — LESBEST Journal`:`Journal — LESBEST`;const description=a?.excerpt??"Property-care insight from LESBEST.";return{meta:[{title},{name:"description",content:description},{property:"og:title",content:title},{property:"og:description",content:description},{property:"og:type",content:"article"},{name:"twitter:card",content:"summary_large_image"}]};},component:ArticleRoute});
function ArticleRoute(){const {articleId}=Route.useParams();return <ArticlePage slug={articleId}/>}