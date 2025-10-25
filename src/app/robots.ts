import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/utils/urls";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl(`/sitemap.xml`),
  };
}
