import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SkipLinkProps = {
  children: ReactNode;
  href: `#${string}`;
  className?: string;
};

export default function SkipLink({
  children,
  href = "#",
  className,
}: SkipLinkProps) {
  return (
    <Button asChild>
      <Link
        href={href}
        className={cn(
          "-translate-y-full focus:translate-0 fixed top-0 right-0 left-0 z-50 w-fit translate-x-0 transition-all duration-100 ease-in focus:m-3",
          className,
        )}
      >
        {children}
      </Link>
    </Button>
  );
}
