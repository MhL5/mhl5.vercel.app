import type { Route } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";

export default function MdxLink({
  href,
  children,
  ...props
}: ComponentProps<"a">) {
  if (href?.startsWith("/"))
    return (
      <Link href={href as Route} {...props}>
        {children}
      </Link>
    );

  if (href?.startsWith("#"))
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
