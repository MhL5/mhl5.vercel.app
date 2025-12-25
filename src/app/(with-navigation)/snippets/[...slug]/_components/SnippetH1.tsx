import SnippetBreadCrumb from "@/app/(with-navigation)/snippets/[...slug]/_components/SnippetBreadCrumb";
import { getSnippetsLinks } from "@/app/(with-navigation)/snippets/_constants/snippetsConstants";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

type SnippetH1Props = {
  heading: ReactNode;
  slug: string;
};

export default async function SnippetH1({ heading, slug }: SnippetH1Props) {
  const neighbors = await findSnippetsNeighbors(slug);

  return (
    <div className="grid gap-7">
      <SnippetBreadCrumb />

      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <h1 id="overview" className="mb-0 break-all">
          {heading}
        </h1>

        <div className="flex gap-2">
          <GoToNeighbor neighbor={neighbors[0]} position="previous" />
          <GoToNeighbor neighbor={neighbors[1]} position="next" />
        </div>
      </div>
    </div>
  );
}

function GoToNeighbor({
  neighbor,
  position,
}: {
  neighbor: Awaited<ReturnType<typeof findSnippetsNeighbors>>[number] | null;
  position: "previous" | "next";
}) {
  if (!neighbor)
    return (
      <Button
        size="icon"
        disabled
        variant="secondary"
        className="size-8 xl:size-9"
        title="not available"
        aria-disabled
      >
        <ArrowRight className={position === "previous" ? "rotate-180" : ""} />
      </Button>
    );

  const { title, url } = neighbor;
  return (
    <Button
      size="icon"
      variant="secondary"
      className="size-8 xl:size-9"
      asChild
    >
      <Link
        href={url as Route}
        className="size-8 xl:size-9"
        title={`go to ${position === "previous" ? `previous "${title}"` : `next "${title}"`}`}
      >
        <ArrowRight className={position === "previous" ? "rotate-180" : ""} />
      </Link>
    </Button>
  );
}

async function findSnippetsNeighbors(slug: string) {
  const links = await getSnippetsLinks();
  let neighbors: { title: string; url: string }[] = [];

  for (const category of links) {
    if (!category.items) continue;

    for (let i = 0; i < category.items.length; i++) {
      const categoryItemTitle = category.items[i].title.trim().toLowerCase();
      const slugLowerCase = slug.trim().toLowerCase();

      if (categoryItemTitle !== slugLowerCase) continue;

      const prev = category.items[i - 1];
      const next = category.items[i + 1];
      neighbors = [prev, next];
      break;
    }

    if (neighbors.length) break;
  }

  return neighbors;
}
