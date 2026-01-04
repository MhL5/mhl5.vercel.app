import type { ComponentProps } from "react";

import Code from "./Code";
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
    <Code {...props} className={className}>
      {children}
    </Code>
  );
}
