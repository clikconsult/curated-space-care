// Social-sharing metadata (Open Graph + X/Twitter cards) for every page.
// SITE_URL must be the public origin with no trailing slash. Update it when a
// custom domain goes live, because share crawlers need absolute URLs.
export const SITE_URL = "https://lesbest.com.ng";
export const SITE_NAME = "LESBEST";

const ogUrl = (name: string) => `${SITE_URL}/og/${name}.jpg`;

type SeoInput = {
  title: string;
  description: string;
  ogDescription?: string;
  path: string;
  image: string; // file name in /public/og, without extension
  imageAlt: string;
  type?: "website" | "article";
};

export function seo({ title, description, ogDescription, path, image, imageAlt, type = "website" }: SeoInput) {
  const url = `${SITE_URL}${path}`;
  const img = ogUrl(image);
  const shareDescription = ogDescription ?? description;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_NG" },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: shareDescription },
      { property: "og:image", content: img },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: shareDescription },
      { name: "twitter:image", content: img },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
