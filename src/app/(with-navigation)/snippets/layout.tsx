import Aside from "@/app/(with-navigation)/snippets/_components/Aside";
import AutoScrollToTop from "@/app/(with-navigation)/snippets/components/ScrollToTopOnNavigation";
import LinkButton from "@/components/blocks/buttons/LinkButton";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AutoScrollToTop />

      <div className="mx-auto grid min-h-svh w-full lg:grid-cols-[14rem_1fr] xl:grid-cols-[17.875rem_1fr_15rem]">
        <Aside />

        <main className="prose prose-headings:font-nunito dark:prose-invert mx-auto w-full max-w-4xl overflow-x-hidden px-4 pt-4 pb-10 md:px-6 md:pt-8">
          {children}
        </main>

        {/* todo: hidden */}
        <aside className="text-muted-foreground flex flex-col gap-1 pt-8 pb-2 text-sm opacity-0">
          <LinkButton
            buttonProps={{
              variant: "ghost",
              size: "sm",
            }}
            href=""
            className="text-muted-foreground inline-block h-6 w-fit text-sm"
          >
            lets see
          </LinkButton>
          <LinkButton
            buttonProps={{
              variant: "ghost",
              size: "sm",
            }}
            href=""
            className="text-muted-foreground inline-block h-6 w-fit text-sm"
          >
            lets see
          </LinkButton>
        </aside>
      </div>
    </>
  );
}
