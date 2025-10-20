"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const headingDepthMap = {
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
} as const;

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
  tocDepth?: number;
};

type TocItem = { title: string; id: string; depth: number };

export default function SnippetToc({ className, tocDepth }: SnippetTocProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const pathname = usePathname();
  const activeHeading = useActiveItem(toc.map((item) => item.id));

  // todo: we should fix this by moving this component to the snippet page
  // biome-ignore lint/correctness/useExhaustiveDependencies: we need to re run this effect when pathname changes, since this component is render inside the layout and not the snippet page,
  useEffect(() => {
    const headings = document.querySelectorAll(
      tocDepth
        ? Array.from({ length: tocDepth }, (_, i) => `h${i + 2}`).join(", ")
        : "h2, h3",
    );

    const overview = document.getElementById("overview");
    if (headings) {
      const tocHeadings = Array.from(headings).map((heading) => ({
        title: heading.textContent ?? "",
        id: heading.id,
        depth:
          headingDepthMap[
            heading.tagName.toLowerCase() as keyof typeof headingDepthMap
          ],
      }));
      setToc(
        overview
          ? [{ title: "Overview", id: "overview", depth: 1 }, ...tocHeadings]
          : tocHeadings,
      );
    }
  }, [pathname, tocDepth]);

  if (toc.length <= 1) return null;
  return (
    <div
      className={cn(
        "sticky top-18 flex flex-col gap-2 p-4 pt-0 text-sm",
        className,
      )}
    >
      <p className="sticky top-0 h-6 bg-background text-muted-foreground text-xs">
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
