import { type MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  return {
    name: "Mohammad Lashani Portfolio",
    short_name: "MhL",
    description:
      "Mohammad Lashani - Software engineer passionate about building user-friendly and efficient web applications. Explore my portfolio, code snippets, and technical insights.",
    display: "fullscreen",
    orientation: "portrait",
    scope: "/",
  };
}
