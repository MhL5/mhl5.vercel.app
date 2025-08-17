"use client";

import LinkButton from "@/components/blocks/buttons/LinkButton";
import { Button } from "@/components/ui/button";
import { snippetsCategoryConfig } from "@/constants/constants";
import { snippetsLinks } from "@/constants/snippetsLinks";
import { cn } from "@/lib/utils";
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
    className={cn("w-full justify-start transition-all", className)}
  >
    <Link href={url}>{title}</Link>
  </Button>
);

export default function Aside({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("w-full", className)}>
      <nav className="no-visible-scrollbar || grid gap-6 px-3 pt-4 xl:sticky xl:top-16 xl:h-[calc(100svh-4rem)] xl:overflow-y-auto xl:px-5 xl:pb-8">
        {snippetsLinks.map(({ title, url, items }) => {
          const config = snippetsCategoryConfig?.[`${title}`];
          const Icon = config.icon;

          return (
            <div
              key={`${title}-${url}`}
              className={title === "components" ? "capitalize" : ""}
            >
              <LinkButton
                href={url}
                buttonProps={{
                  variant: "ghost",
                }}
                className={`${config.tailwindClass} || mb-2 flex w-full items-center justify-start gap-2 px-2 text-sm font-semibold tracking-wider capitalize`}
              >
                {Icon ? <Icon className="size-4" /> : null}
                {title}
              </LinkButton>
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
