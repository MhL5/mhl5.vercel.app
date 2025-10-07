import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SnippetH1 from "@/app/(with-navigation)/snippets/[...slug]/_components/SnippetH1";
import { Badge } from "@/components/ui/badge";
import { shadcnRegistry } from "@/constants/constants";
import MdxRemoteServer from "@/features/MDX-remote/MdxRemoteServer";
import { isDev } from "@/registry/utils/checks/checks";
import { fileReader } from "@/utils/fileReader";

export async function generateMetadata({
  params,
}: PageProps<"/snippets/[...slug]">): Promise<Metadata> {
  const { slug = [] } = await params;
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
  return shadcnRegistry.items.map((item) => {
    // Try to infer the category from the first file path, fallback to "components"
    const firstFilePath = item.files?.[0]?.path || "";
    let category = "components";
    if (firstFilePath.includes("hooks/")) category = "hooks";
    else if (firstFilePath.includes("actions/")) category = "actions";
    else if (firstFilePath.includes("utils/")) category = "utils";
    else if (firstFilePath.includes("types/")) category = "types";
    return {
      slug: [category, item.name],
    };
  });
}

export default async function Page({
  params,
}: PageProps<"/snippets/[...slug]">) {
  const { slug = [] } = await params;

  if (!slug || slug.length === 0) return notFound();

  const content = await fileReader(`contents/snippets/${slug.join("/")}.mdx`);
  const item = shadcnRegistry.items.find((item) => item.name === slug.at(-1));

  if (!item) {
    if (isDev()) return "item not found inside shadcn registry";
    return notFound();
  }

  const isNotPublished = content.includes("#not-published");
  if (isNotPublished && !isDev()) return notFound();

  return (
    <div id="main">
      <SnippetH1
        heading={
          <div className="flex flex-wrap items-center gap-2">
            {item.title}{" "}
            {isNotPublished && (
              <Badge className="text-base" variant="error">
                not published
              </Badge>
            )}
          </div>
        }
        slug={slug.at(-1) || ""}
      />

      <MdxRemoteServer
        source={`
        ${item?.description}\n
        ${content}
        `}
      />
    </div>
  );
}
