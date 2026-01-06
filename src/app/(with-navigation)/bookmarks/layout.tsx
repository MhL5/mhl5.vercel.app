import { CONTACT_INFO } from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks",
  description:
    "A collection of interesting links, articles, and resources I've saved. From development tools to design inspiration, these are the digital gems I keep coming back to.",
  keywords: [
    "Bookmarks",
    "Links",
    "Articles",
    "Resources",
    "Mohammad Lashani",
    "MhL5",
    "محمد لشنی",
    "کدهای MhL5",
    "محمد حسین لشنی",
  ],
  alternates: {
    canonical: "/bookmarks",
  },
  authors: [{ name: "Mohammad Lashani", url: CONTACT_INFO.github }],
  creator: "Mohammad Lashani",
  publisher: "Mohammad Lashani",
  category: "technology",
};

export default function Layout({ children }: LayoutProps<"/bookmarks">) {
  return children;
}
