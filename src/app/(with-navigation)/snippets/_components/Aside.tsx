"use client";

import LinkIndicator from "@/components/LinkIndicator";
import { Button } from "@/components/ui/button";
import { navigationLinks, snippetsCategoryConfig } from "@/constants/constants";
import { cn } from "@/lib/utils";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  title: string;
  url: string;
  isActive: boolean;
  className?: string;
  isSubItem?: boolean;
}

const NavItem = ({
  title,
  url,
  isActive,
  className,
  isSubItem,
}: NavItemProps) => (
  <Button
    asChild
    variant={isActive ? "secondary" : "ghost"}
    size={isSubItem ? "xs" : "sm"}
    className={cn("w-full justify-between transition-all", className)}
  >
    <Link href={url as Route}>
      {title}
      <LinkIndicator />
    </Link>
  </Button>
);

type AsideProps = {
  className?: string;
  navigationLinks: typeof navigationLinks;
};

export default function Aside({ className, navigationLinks }: AsideProps) {
  const pathname = usePathname();

  return (
    <aside className={cn("w-full", className)}>
      <nav className="no-visible-scrollbar || grid gap-6 px-3 pt-4 xl:sticky xl:top-16 xl:h-[calc(100svh-4rem)] xl:overflow-y-auto xl:px-5 xl:pb-8">
        {navigationLinks.map(({ title, url, items }) => {
          const config = snippetsCategoryConfig?.[`${title}`];
          if (!config) return null;
          const Icon = config.icon;

          return (
            <div
              key={`${title}-${url}`}
              className={title === "components" ? "capitalize" : ""}
            >
              <div
                className={`${config.tailwindClass} || mb-2 flex h-8 w-full items-center justify-start gap-2 px-2 text-sm font-semibold tracking-wider capitalize`}
              >
                {Icon ? <Icon className="size-4" /> : null}
                {title}
              </div>
              <div className="space-y-1 pl-0.5">
                {items?.map((item, i) => {
                  const isActive = pathname.includes(item.url);

                  return (
                    <div
                      key={`${item.title}-${item.url}-${i}`}
                      className="space-y-1"
                    >
                      <NavItem
                        title={item.title}
                        url={item.url}
                        isActive={isActive}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
