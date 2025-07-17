"use client";

import LinkButton from "@/components/blocks/buttons/LinkButton";
import { ThemeToggle } from "@/components/blocks/buttons/ThemeToggle";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  return (
    <>
      <header
        className={cn(
          "bg-background/50 fixed top-0 z-50 h-14 w-dvw backdrop-blur-md",
          isHome ? "animate-fade-in" : "",
        )}
      >
        <nav className="mx-auto flex h-full w-full items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <LinkButton
              buttonProps={{ variant: "link" }}
              href="/"
              className="font-nunito text-xl font-bold"
            >
              MhL
            </LinkButton>

            <LinkButton
              buttonProps={{ variant: "link" }}
              className="font-medium"
              href="/snippets"
            >
              Snippets
            </LinkButton>
            <LinkButton
              buttonProps={{ variant: "link" }}
              className="font-medium"
              href="/bookmarks"
            >
              Bookmarks
            </LinkButton>
          </div>

          <div>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {isHome ? null : <div className="h-14" aria-hidden="true" />}
    </>
  );
}
