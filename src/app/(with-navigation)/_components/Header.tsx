"use client";

import { ThemeToggle } from "@/components/buttons/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GITHUB_REPO_URL } from "@/constants";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "Snippets",
    href: "/snippets",
  },
  {
    label: "Bookmarks",
    href: "/bookmarks",
  },
] as const;

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 z-50 h-[var(--site-header-height)] w-[calc(100%-var(--removed-body-scroll-bar-size,0px))] border-b border-border/20 bg-background/20 backdrop-blur-md dark:border-border/30">
        <nav className="mx-auto flex h-full w-full max-w-9xl items-center px-4">
          <Sheet>
            <SheetTrigger className="lg:hidden" asChild>
              <Button variant="ghost">
                <span className="sr-only">Menu</span>
                <MenuIcon className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="max-w-xs sm:max-w-xs">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    variant="link"
                    className="font-nunito px-0 text-xl font-bold"
                    href="/"
                  >
                    MhL
                  </Link>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  main page navigation menu for mobile devices
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-1.5 px-2">
                {links.map(({ href, label }) => {
                  return (
                    <SheetClose key={`${href}-${label}`} asChild>
                      <Link
                        variant="ghost"
                        size="lg"
                        className="justify-start font-medium"
                        href={href}
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>

          <div className="mr-auto flex items-center gap-6">
            <Link
              href="/"
              variant="link"
              className="font-nunito px-0 text-xl font-bold no-underline hover:underline md:px-4"
            >
              MhL
            </Link>

            {links.map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  variant="link"
                  key={href}
                  className={cn(
                    "hidden w-fit px-0 font-medium no-underline hover:underline lg:inline-block",
                    isActive && "underline",
                  )}
                  href={href}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 px-2">
            <Link
              variant="ghost"
              href={GITHUB_REPO_URL}
              target="_blank"
              prefetch={false}
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
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <div className="h-14" aria-hidden="true" />
    </>
  );
}
