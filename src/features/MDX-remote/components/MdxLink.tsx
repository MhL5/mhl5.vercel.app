import type { Route } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const defaultClassName = "text-info-foreground underline underline-offset-2";

export default function MdxLink({
  href,
  children,
  className,
  ...props
}: ComponentProps<"a">) {
  if (href?.startsWith("/"))
    return (
      <Link
        href={href as Route}
        className={cn(defaultClassName, className)}
        {...props}
      >
        {children}
      </Link>
    );

  if (href?.startsWith("#"))
    return (
      <a href={href} className={cn(defaultClassName, className)} {...props}>
        {children}
      </a>
    );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(defaultClassName, className)}
      {...props}
    >
      {children}
    </a>
  );
}
