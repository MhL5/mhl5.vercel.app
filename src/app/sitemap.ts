import { getShadcnRegistry } from "@/app/(with-navigation)/snippets/_constants/snippetsConstants";
import { absoluteUrl } from "@/utils/absoluteUrl";
import type { MetadataRoute } from "next";
import { cacheLife } from "next/cache";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("days");

  const snippets = await getShadcnRegistry();

  const snippetsLinks = snippets.items.reduce((acc, item) => {
    const urlStartsWithSlash = item.meta.url.startsWith("/");
    if (urlStartsWithSlash)
      acc.push({
        url: absoluteUrl(item.meta.url as `/${string}`),
        changeFrequency: "monthly",
        priority: 0.8,
      });

    return acc;
  }, [] as MetadataRoute.Sitemap);

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/snippets"),
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/bookmarks"),
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...snippetsLinks,
  ];
}
