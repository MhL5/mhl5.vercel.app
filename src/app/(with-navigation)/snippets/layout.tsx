import Aside from "@/app/(with-navigation)/snippets/_components/Aside";
import SnippetToc from "@/app/(with-navigation)/snippets/_components/SnippetToc";
import { navigationLinks } from "@/constants/constants";
import ScrollToTop from "@/registry/new-york/ScrollToTop/ScrollToTop";

export default function MdxLayout({ children }: LayoutProps<"/snippets">) {
  return (
    <>
      <ScrollToTop variant="on-navigation" />

      <div className="mx-auto grid min-h-svh w-full max-w-[1950px] lg:grid-cols-[14rem_1fr] xl:grid-cols-[17.875rem_1fr_15rem]">
        <Aside navigationLinks={navigationLinks} className="hidden lg:block" />

        <main
          id="main"
          className="prose prose-headings:font-nunito dark:prose-invert mx-auto w-full max-w-4xl overflow-x-hidden px-4 pt-4 pb-10 md:px-6 md:pt-8"
        >
          {children}
        </main>

        <aside className="text-muted-foreground hidden flex-col gap-1 pt-8 pb-2 text-sm xl:flex">
          <SnippetToc />
        </aside>
      </div>
    </>
  );
}
