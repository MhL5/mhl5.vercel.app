import type { ComponentProps } from "react";

import ComponentSourceClient from "./ComponentSourceClient";

export default function MdxCodeClient({
  children,
  className,
  ...props
}: ComponentProps<"code">) {
  if (className?.startsWith("language-"))
    return (
      <ComponentSourceClient
        lang="tsx"
        code={String(children).replace(/\n$/, "")}
      />
    );
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
