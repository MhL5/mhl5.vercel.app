"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSnippetsCategoryConfig } from "@/app/(with-navigation)/snippets/_constants/snippetsConstants";
import { useSnippetsLinks } from "@/app/(with-navigation)/snippets/_context/SnippetsLinksContext";
import LinkIndicator from "@/components/LinkIndicator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AsideProps = {
  className?: string;
};

export default function Aside({ className }: AsideProps) {
  const pathname = usePathname();
  const links = useSnippetsLinks();

  return (
    <aside className={cn("w-full", className)}>
      <ul className="no-visible-scrollbar || grid gap-6 px-3 pt-4 xl:sticky xl:top-16 xl:h-[calc(100svh-4rem)] xl:overflow-y-auto xl:px-5 xl:pb-8">
        {links.map(({ title, url, items }) => {
          const config = getSnippetsCategoryConfig(title);
          if (!config) return null;
          const Icon = config.icon;

          return (
            <li key={`${title}-${url}`}>
              <div
                className={`${config.tailwindClass} || mb-2 flex h-8 w-full items-center justify-start gap-2 px-2 font-semibold text-sm capitalize tracking-wider`}
              >
                {Icon ? <Icon className="size-4" /> : null}
                {title}
              </div>

              <nav className="space-y-1 pl-0.5">
                {items?.map(({ title, url }, i) => {
                  const isActive = pathname.includes(url);

                  return (
                    <Button
                      asChild
                      key={`${title}-${url}-${i}`}
                      variant={isActive ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-between transition-all"
                    >
                      <Link href={url as Route}>
                        {title}
                        <LinkIndicator />
                      </Link>
                    </Button>
                  );
                })}
              </nav>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
