import { ArrowRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { getSnippetsLinks } from "@/app/(with-navigation)/snippets/_constants/snippetsConstants";
import SnippetBreadCrumb from "@/app/(with-navigation)/snippets/[...slug]/_components/SnippetBreadCrumb";
import { Button } from "@/components/ui/button";

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
          {neighbors.map((neighbor, index) => {
            if (!neighbor)
              return (
                <Button
                  key={`h1-link-button-disabled-${index + 1}`}
                  size="icon"
                  disabled
                  variant="secondary"
                  className="size-8 xl:size-9"
                  title={`not available`}
                >
                  <ArrowRight className={index === 0 ? "rotate-180" : ""} />
                </Button>
              );

            return (
              <Button
                key={`h1-link-button-${neighbor.title}-${index}`}
                size="icon"
                variant="secondary"
                className="size-8 xl:size-9"
                asChild
              >
                <Link
                  href={(neighbor?.url as Route) || "#"}
                  className="size-8 xl:size-9"
                  title={`go ${index === 0 ? "previous" : "next"}`}
                >
                  <ArrowRight className={index === 0 ? "rotate-180" : ""} />
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
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
