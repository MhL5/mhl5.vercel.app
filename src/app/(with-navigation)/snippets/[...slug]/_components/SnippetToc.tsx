"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActiveId(entry.target.id);
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    for (const id of itemIds ?? []) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => {
      for (const id of itemIds ?? []) {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      }
    };
  }, [itemIds]);

  return activeId;
}
type TocItem = { title: string; id: string; depth: number };

type SnippetTocProps = {
  className?: string;
  tocDepth?: number;
  toc: TocItem[];
};

export default function SnippetToc({ className, toc }: SnippetTocProps) {
  const activeHeading = useActiveItem(toc.map((item) => item.id));

  if (toc.length <= 1) return null;
  return (
    <div
      className={cn(
        "sticky top-18 flex flex-col gap-2 p-4 pt-0 text-sm",
        className,
      )}
    >
      <p className="sticky top-0 h-6 text-muted-foreground text-xs">
        On This Page
      </p>

      {toc.map((item, index) => (
        <a
          key={`${item.id}-${index}-${item.title}`}
          href={`#${item.id}`}
          className="text-[0.8rem] text-muted-foreground no-underline transition-all hover:text-foreground data-[depth=3]:pl-4 data-[depth=4]:pl-6 data-[depth=5]:pl-8 data-[depth=6]:pl-10 data-[active=true]:font-semibold data-[active=true]:text-foreground"
          data-active={item.id === `${activeHeading}`}
          data-depth={item.depth}
        >
          {item.title}
        </a>
      ))}
    </div>
  );
}
