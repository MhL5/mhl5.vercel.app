import type { ComponentProps } from "react";

import ComponentSource from "./ComponentSource";

export default function MdxCode({
  children,
  className,
  ...props
}: ComponentProps<"code">) {
  if (className?.startsWith("language-"))
    return (
      <ComponentSource
        code={typeof children === "string" ? children : ""}
        lang={className.replace("language-", "")}
      />
    );

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}
