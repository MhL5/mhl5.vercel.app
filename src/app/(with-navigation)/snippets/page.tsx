import SnippetToc from "@/app/(with-navigation)/snippets/[...slug]/_components/SnippetToc";
import { extractHeadings } from "@/app/(with-navigation)/snippets/[...slug]/_utils/extractHeadings";
import SnippetsList from "@/app/(with-navigation)/snippets/_components/SnippetsList";
import { getSnippetsLinks } from "@/app/(with-navigation)/snippets/_constants/snippetsConstants";
import MdxRemoteServer from "@/components/MDX-remote/MdxRemoteServer";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import AutoGrid from "@/registry/new-york/AutoGrid/AutoGrid";
import { snippetsTypography } from "@/styles/typography";
import { fileReader } from "@/utils/fileReader";
import { cacheLife } from "next/cache";
import { Suspense } from "react";

export default async function Page() {
  "use cache";
  cacheLife("weeks");

  const snippetLinks = getSnippetsLinks();
  const content = await fileReader("contents/snippets/snippets.mdx");

  return (
    <div className="grid xl:grid-cols-[1fr_15rem] xl:items-start xl:justify-between xl:gap-5">
      <main
        id="main"
        className={cn(
          snippetsTypography,
          "w-full max-w-full! overflow-hidden px-4 pt-4 pb-10 md:px-6 md:pt-8",
        )}
      >
        <MdxRemoteServer source={content} />

        <Suspense
          fallback={
            <div>
              <div className="flex h-9 flex-wrap items-center justify-between gap-3">
                <Skeleton className="h-full w-28" />
                <Skeleton className="h-full w-16" />
              </div>

              <Skeleton className="mt-5 mb-4 h-9 w-full" />

              <AutoGrid
                maxColCount={3}
                minColSize="10rem"
                gap="1rem"
                className="mx-auto w-full"
                as="div"
              >
                {Array.from(
                  {
                    length: (await snippetLinks).flatMap(({ items }) => items)
                      .length,
                  },
                  (_, i) => (
                    <Skeleton
                      className="h-10 w-full"
                      key={`snippetLinksSkeleton-${i}`}
                    />
                  ),
                )}
              </AutoGrid>
            </div>
          }
        >
          <SnippetsList />
        </Suspense>
      </main>

      <aside className="hidden xl:flex xl:h-full xl:flex-col xl:gap-1 xl:pt-6 xl:pb-2 xl:text-sm xl:text-muted-foreground">
        <SnippetToc toc={extractHeadings(content)} />
      </aside>
    </div>
  );
}
