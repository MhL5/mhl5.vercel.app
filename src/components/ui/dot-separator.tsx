import type { ComponentProps } from "react";

export function DotSeparator(props: Omit<ComponentProps<"span">, "children">) {
  return <span key="FileItem-separator-2" aria-hidden {...props}>{` • `}</span>;
}
