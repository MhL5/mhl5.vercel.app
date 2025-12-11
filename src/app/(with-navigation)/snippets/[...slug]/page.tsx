import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { getShadcnRegistry } from "@/app/(with-navigation)/snippets/_constants/snippetsConstants";
import SnippetH1 from "@/app/(with-navigation)/snippets/[...slug]/_components/SnippetH1";
import SnippetToc from "@/app/(with-navigation)/snippets/[...slug]/_components/SnippetToc";
import { extractHeadings } from "@/app/(with-navigation)/snippets/[...slug]/_utils/extractHeadings";
import MdxRemoteServer from "@/components/MDX-remote/MdxRemoteServer";
import Prose from "@/components/Prose";
import { isDev } from "@/registry/utils/checks/checks";
import { fileReader } from "@/utils/fileReader";

export async function generateMetadata({
  params,
}: PageProps<"/snippets/[...slug]">): Promise<Metadata> {
  "use cache";
  cacheLife("weeks");

  const [{ slug = [] }, shadcnRegistry] = await Promise.all([
    params,
    getShadcnRegistry(),
  ]);

  if (!slug || slug.length === 0) return notFound();

  const item = shadcnRegistry.items.find((item) => item.name === slug.at(-1));

  if (!item) {
    if (isDev()) return { title: "item not found inside shadcn registry" };
    return notFound();
  }

  return {
    title: item.title,
    description: item.description,
    alternates: {
      canonical: `/snippets/${slug.join("/")}`,
    },
    authors: [{ name: "Mohammad Lashani", url: "https://mhl5.dev" }],
    creator: "Mohammad Lashani",
    publisher: "Mohammad Lashani",
    category: "technology",
  };
}

export async function generateStaticParams() {
  const shadcnRegistry = await getShadcnRegistry();

  return shadcnRegistry.items.map((item) => {
    const splittedUrl = item.meta.url.split("/");
    const category = splittedUrl.at(2);
    const slug = splittedUrl.at(-1);

    return {
      slug: [category, slug],
    };
  });
}

export default async function Page({
  params,
}: PageProps<"/snippets/[...slug]">) {
  "use cache";
  cacheLife("weeks");

  const { slug = [] } = await params;
  const snippetSlug = slug?.at(-1);

  if (!slug || slug.length === 0 || !snippetSlug) return notFound();

  const [content, shadcnRegistry] = await Promise.all([
    fileReader(`contents/snippets/${slug.join("/")}.mdx`),
    getShadcnRegistry(),
  ]);

  const item = shadcnRegistry.items.find((item) => item.name === snippetSlug);

  if (!item) {
    if (isDev()) return "item not found inside shadcn registry";
    return notFound();
  }

  return (
    <div className="grid xl:grid-cols-[1fr_15rem] xl:items-start xl:justify-between xl:gap-5">
      <Prose as="main" id="main" className="w-full overflow-hidden">
        <SnippetH1
          heading={
            <div className="flex flex-wrap items-center gap-2">
              {item.title}
            </div>
          }
          slug={snippetSlug}
        />

        <MdxRemoteServer
          source={`
          ${item?.description}\n
          ${content}
          `}
        />
      </Prose>

      <aside className="hidden xl:flex xl:h-full xl:flex-col xl:gap-1 xl:pt-6 xl:pb-2 xl:text-muted-foreground xl:text-sm">
        <SnippetToc toc={extractHeadings(content)} />
      </aside>
    </div>
  );
}
