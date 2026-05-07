"use client";

import { Link } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import type { Route } from "next";
import { usePathname } from "next/navigation";

type HeaderLinkProps = {
  href: Route;
  label: string;
};

function HeaderLink({ href, label }: HeaderLinkProps) {
  const pathname = usePathname();

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
}

export { HeaderLink };
