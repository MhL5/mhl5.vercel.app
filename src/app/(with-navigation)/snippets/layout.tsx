import type { Metadata } from "next";
import Aside from "@/app/(with-navigation)/snippets/_components/Aside";
import SnippetToc from "@/app/(with-navigation)/snippets/_components/SnippetToc";
import Prose from "@/components/Prose";
import { navigationLinks } from "@/constants/constants";
import ScrollToTop from "@/registry/new-york/ScrollToTop/ScrollToTop";

export const metadata: Metadata = {
  title: {
    default: "Code Snippets Collection",
    template: "%s | MhL",
  },
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
    { name: "Mohammad Lashani", url: "https://mhl5.dev" },
    { name: "محمد لشنی", url: "https://mhl5.dev" },
  ],
  creator: "Mohammad Lashani",
  publisher: "Mohammad Lashani",
  category: "technology",
};

export default function MdxLayout({ children }: LayoutProps<"/snippets">) {
  return (
    <>
      <ScrollToTop variant="on-navigation" />

      <div className="mx-auto grid min-h-svh w-full max-w-8xl lg:grid-cols-[14rem_1fr] xl:grid-cols-[17.875rem_1fr_15rem]">
        <Aside navigationLinks={navigationLinks} className="hidden lg:block" />

        <Prose as="main" id="main" className="">
          {children}
        </Prose>

        <aside className="hidden flex-col gap-1 pt-8 pb-2 text-muted-foreground text-sm xl:flex">
          <SnippetToc />
        </aside>
      </div>
    </>
  );
}
