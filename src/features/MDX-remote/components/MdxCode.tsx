import type { ComponentProps } from "react";
import ComponentSource from "@/features/MDX-remote/components/ComponentSource";

export default function MdxCode({
  children,
  className,
  ...props
}: ComponentProps<"code">) {
  if (className?.startsWith("language-")) {
    // If it's a code block
    const lang = className.replace("language-", ""); // Extract the

    return (
      <ComponentSource
        code={typeof children === "string" ? children : ""}
        lang={lang}
      />
    );
  }

  return (
    <code
      {...props}
      className="text-nowrap rounded-sm bg-secondary px-1.5 py-0.5 text-secondary-foreground tracking-wide before:content-none after:content-none prose-code:after:content-none"
    >
      {typeof children === "string" ? children.replaceAll("`", "") : children}
    </code>
  );
}
