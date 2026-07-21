"use client";

import { getSnippetsCategoryConfig } from "@/app/(with-navigation)/snippets/_constants/snippetsConstants";
import { useSnippetsLinks } from "@/app/(with-navigation)/snippets/_context/SnippetsLinksContext";
import { NavLink, NavLinkPending } from "@/components/ui/NavLink";
import { cn } from "@/lib/utils";
import type { Route } from "next";

type AsideProps = {
  className?: string;
};

export default function Aside({ className }: AsideProps) {
  const links = useSnippetsLinks();

  return (
    <aside className={cn("w-full", className)}>
      <ul
        className="grid gap-6 overscroll-contain px-3 pt-4 lg:sticky lg:top-16 lg:h-[calc(100svh-4rem)] lg:overflow-y-auto lg:pb-8 xl:px-5"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {links.map(({ title, url, items }) => {
          const config = getSnippetsCategoryConfig(title);
          if (!config) return null;
          const Icon = config.icon;

          return (
            <li key={`${title}-${url}`}>
              <div
                className={`${config.tailwindClass} || mb-2 flex h-8 w-full items-center justify-start gap-2 px-2 text-sm font-semibold tracking-wider capitalize`}
              >
                {Icon ? <Icon className="size-4" /> : null}
                {title}
              </div>

              <nav className="space-y-1 pl-0.5">
                {items?.map(({ title, url }) => (
                  <NavLink
                    key={`${title}-${url}`}
                    size="sm"
                    exact
                    className="w-full justify-between pe-1.5 transition-all aria-[current=page]:bg-secondary aria-[current=page]:text-secondary-foreground aria-[current=page]:hover:bg-secondary/80"
                    href={url as Route}
                  >
                    {title}

                    <div className="size-4">
                      <NavLinkPending />
                    </div>
                  </NavLink>
                ))}
              </nav>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
