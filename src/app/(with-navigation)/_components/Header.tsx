"use client";

import SkipLink from "@/registry/new-york/SkipLink/SkipLink";
import LinkButton from "@/components/buttons/LinkButton";
import { ThemeToggle } from "@/components/buttons/ThemeToggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  {
    label: "Snippets",
    href: "/snippets",
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
  },
  {
    label: "Tools",
    href: "/tools",
  },
];

// todo: temp solution, its better to hard code an array of pages that have a main id
function usePageWithMainId() {
  const [hasMainId, setHasMainId] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const mainId = document.getElementById("#main");
    if (mainId) setHasMainId(true);

    return () => setHasMainId(false);
  }, [pathname]);

  return hasMainId;
}

export default function Header() {
  const pathname = usePathname();
  const hasMainId = usePageWithMainId();

  const isHome = pathname === "/";

  return (
    <>
      <header className="bg-background/50 border-border/30 fixed top-0 z-50 h-13 w-dvw border-b backdrop-blur-md">
        <nav className="mx-auto flex h-full w-full max-w-[2000px] items-center justify-between px-4">
          <div className="flex items-center gap-6">
            {hasMainId && (
              <SkipLink href="#main">Skip to main content</SkipLink>
            )}
            <Sheet>
              <SheetTrigger className="lg:hidden">
                <span className="sr-only">Menu</span>
                <MenuIcon className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="max-w-xs sm:max-w-xs">
                <SheetHeader>
                  <SheetTitle>
                    <LinkButton
                      buttonProps={{ variant: "link" }}
                      href="/"
                      className="font-nunito px-0 text-xl font-bold md:px-4"
                    >
                      MhL
                    </LinkButton>
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    main page navigation menu for mobile devices
                  </SheetDescription>
                </SheetHeader>

                {links.map(({ href, label }, i) => {
                  return (
                    <SheetClose key={`${href}-${label}-${i}`} asChild>
                      <LinkButton
                        buttonProps={{ variant: "link" }}
                        className="justify-start font-medium"
                        href={href}
                      >
                        {label}
                      </LinkButton>
                    </SheetClose>
                  );
                })}
              </SheetContent>
            </Sheet>

            <LinkButton
              buttonProps={{ variant: "link" }}
              href="/"
              className="font-nunito px-0 text-xl font-bold md:px-4"
            >
              MhL
            </LinkButton>

            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <LinkButton
                  key={href}
                  buttonProps={{ variant: "link" }}
                  className={cn(
                    "hidden w-fit px-0 font-medium lg:inline-block",
                    isActive && "underline",
                  )}
                  href={href}
                >
                  {label}
                </LinkButton>
              );
            })}
          </div>

          <div className="flex items-center gap-2 px-2">
            <LinkButton
              href="https://github.com/MhL5"
              target="_blank"
              prefetch={false}
              buttonProps={{ variant: "ghost" }}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-primary"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </LinkButton>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {isHome ? null : <div className="h-14" aria-hidden="true" />}
    </>
  );
}
