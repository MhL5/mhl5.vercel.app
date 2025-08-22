import LinkButton from "@/components/buttons/LinkButton";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

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
    <LinkButton
      href={href}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 w-fit translate-x-0 -translate-y-full transition-all duration-100 ease-in focus:m-3 focus:translate-0",
        className,
      )}
    >
      {children}
    </LinkButton>
  );
}
