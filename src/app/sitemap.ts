import { shadcnRegistry } from "@/constants/constants";
import { absoluteUrl } from "@/utils";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const snippetPages: MetadataRoute.Sitemap = shadcnRegistry.items.map(
    (item) => ({
      url: absoluteUrl(`/snippets/${item.name}`),
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

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
    ...snippetPages,
  ];
}
