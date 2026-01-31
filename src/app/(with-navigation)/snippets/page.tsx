import SnippetToc from "@/app/(with-navigation)/snippets/[...slug]/_components/SnippetToc";
import { extractHeadings } from "@/app/(with-navigation)/snippets/[...slug]/_utils/extractHeadings";
import SnippetsList from "@/app/(with-navigation)/snippets/_components/SnippetsList";
import MdxRemoteServer from "@/components/MDX-remote/MdxRemoteServer";
import { Typography } from "@/components/Typography";
import { fileReader } from "@/utils/fileReader";
import { cacheLife } from "next/cache";
import { Suspense } from "react";

export default async function Page() {
  "use cache";
  cacheLife("weeks");

  const content = await fileReader("contents/snippets/snippets.mdx");

  return (
    <div className="grid xl:grid-cols-[1fr_15rem] xl:items-start xl:justify-between xl:gap-5">
      <Typography as="main" id="main" className="w-full overflow-hidden">
        <MdxRemoteServer source={content} />

        <Suspense>
          <SnippetsList />
        </Suspense>
      </Typography>

      <aside className="hidden xl:flex xl:h-full xl:flex-col xl:gap-1 xl:pt-6 xl:pb-2 xl:text-sm xl:text-muted-foreground">
        <SnippetToc toc={extractHeadings(content)} />
      </aside>
    </div>
  );
}
