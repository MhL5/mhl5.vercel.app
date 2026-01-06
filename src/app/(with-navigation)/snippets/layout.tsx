import Aside from "@/app/(with-navigation)/snippets/_components/Aside";
import { getSnippetsLinks } from "@/app/(with-navigation)/snippets/_constants/snippetsConstants";
import { SnippetsLinksProvider } from "@/app/(with-navigation)/snippets/_context/SnippetsLinksContext";
import ScrollToTop from "@/components/utils/ScrollToTop";
import { CONTACT_INFO } from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Snippets Collection",
  description: "A collection of reusable React and Next.js code snippets",
  keywords: [
    "React snippets",
    "Next.js snippets",
    "shadcn/ui",
    "code snippets",
    "MhL5 snippets",
    "React code examples",
    "Next.js code examples",
    "UI components",
    "web development",
    "Mohammad Lashani",
    "MhL portfolio",
    "کدهای MhL5",
    "محمد لشنی",
  ],
  alternates: {
    canonical: "/snippets",
  },
  authors: [
    { name: "Mohammad Lashani", url: CONTACT_INFO.github },
    { name: "محمد لشنی", url: CONTACT_INFO.github },
  ],
  creator: "Mohammad Lashani",
  publisher: "Mohammad Lashani",
  category: "technology",
};

export default function Layout({ children }: LayoutProps<"/snippets">) {
  const snippetsLinksPromise = getSnippetsLinks();

  return (
    <>
      <ScrollToTop variant="on-navigation" />

      <div className="mx-auto grid min-h-svh w-full max-w-8xl lg:grid-cols-[14rem_1fr] xl:grid-cols-[17.875rem_1fr]">
        <SnippetsLinksProvider linksPromise={snippetsLinksPromise}>
          <Aside className="hidden lg:block" />

          {children}
        </SnippetsLinksProvider>
      </div>
    </>
  );
}
