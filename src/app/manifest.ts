import type { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    name: "MhL",
    short_name: "MhL",
    description:
      "Mohammad Lashani - Software engineer passionate about building user-friendly and efficient web applications. Explore my portfolio, code snippets, and technical insights.",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
    start_url: "/",
    // icons: [
    //   { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
    //   { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    //   {
    //     src: "/icon-512-maskable.png",
    //     sizes: "512x512",
    //     type: "image/png",
    //     purpose: "maskable",
    //   },
    // ],
  };
}
