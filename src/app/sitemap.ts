import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/utils/absoluteUrl";

export const revalidate = 259200; // 3 days

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  ];
}
