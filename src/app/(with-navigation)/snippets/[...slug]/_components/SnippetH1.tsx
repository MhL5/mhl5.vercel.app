import SnippetBreadCrumb from "@/app/(with-navigation)/snippets/[...slug]/_components/SnippetBreadCrumb";
import { Button } from "@/components/ui/button";
import { navigationLinks } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type SnippetH1Props = {
  heading: ReactNode;
  slug: string;
};

export default function SnippetH1({ heading, slug }: SnippetH1Props) {
  let prevNext: { title: string; url: string }[] = [];

  for (const category of navigationLinks) {
    if (!category.items) continue;

    for (let i = 0; i < category.items.length; i++) {
      const categoryItemTitle = category.items[i].title.trim().toLowerCase();
      const slugLowerCase = slug.trim().toLowerCase();

      if (categoryItemTitle === slugLowerCase) {
        const prev = category.items[i - 1];
        const next = category.items[i + 1];
        prevNext = [prev, next];
        break;
      }
    }

    if (prevNext.length) break;
  }

  return (
    <div className="grid gap-7">
      <SnippetBreadCrumb />

      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <h1
          id="overview"
          className={cn(
            "mb-0 break-all",
            typeof heading === "string" &&
              !heading.toLowerCase().startsWith("use")
              ? "capitalize"
              : "",
          )}
        >
          {heading}
        </h1>

        <div className="flex gap-2">
          {prevNext.map((item, index) => {
            if (!item)
              return (
                <Button
                  key={`h1-link-button${index}`}
                  size="icon"
                  disabled={!item}
                  variant="secondary"
                  className="size-8 xl:size-9"
                >
                  <H1PrevNextChildren disabled={true} index={index} />
                </Button>
              );

            return (
              <Button
                key={`h1-link-button${index}`}
                size="icon"
                disabled={!item}
                variant="secondary"
                asChild
              >
                <Link href={item?.url || "#"} className="size-8 xl:size-9">
                  <H1PrevNextChildren index={index} />
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function H1PrevNextChildren({
  index,
  disabled,
}: {
  index: number;
  disabled?: boolean;
}) {
  return (
    <>
      <span className="sr-only">
        {disabled ? "not available" : `go ${index === 0 ? "previous" : "next"}`}
      </span>

      {index === 0 ? <ArrowRight className="rotate-180" /> : <ArrowRight />}
    </>
  );
}
