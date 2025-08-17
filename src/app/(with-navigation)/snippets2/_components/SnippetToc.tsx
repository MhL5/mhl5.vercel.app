"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

type SnippetTocProps = {
  className?: string;
};

type TocItem = { title: string; id: string; depth: number };

export default function SnippetToc({ className }: SnippetTocProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const pathname = usePathname();
  const activeHeading = useActiveItem(toc.map((item) => item.id));

  useEffect(() => {
    const headings = document.querySelectorAll("h2, h3");

    if (headings)
      setToc(
        Array.from(headings).map((heading) => ({
          title: heading.textContent ?? "",
          id: heading.id,
          depth: heading.tagName.toLowerCase() === "h2" ? 2 : 3,
        })),
      );
  }, [pathname]);

  if (toc.length <= 1) return null;
  return (
    <div
      className={cn(
        "sticky top-18 flex flex-col gap-2 p-4 pt-0 text-sm",
        className,
      )}
    >
      <p className="text-muted-foreground bg-background sticky top-0 h-6 text-xs">
        On This Page
      </p>

      {toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground text-[0.8rem] no-underline transition-colors data-[depth=3]:pl-4 data-[depth=4]:pl-6"
          data-active={item.id === `${activeHeading}`}
          data-depth={item.depth}
        >
          {item.title}
        </a>
      ))}
    </div>
  );
}
