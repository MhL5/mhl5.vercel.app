import CopyButton from "@/components/blocks/buttons/CopyButton";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type ShellProps = {
  codeHTML: string;
} & ComponentPropsWithoutRef<"code">;

export default function CodeBlockShell({
  codeHTML,
  className,
  ...props
}: ShellProps) {
  return (
    <pre className="not-prose relative my-1 h-fit max-w-full overflow-x-auto">
      <CopyButton
        content={codeHTML as string}
        className="absolute top-3 right-3"
      />

      <code
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        className={cn(
          "max-h-96 max-w-full overflow-auto text-sm leading-relaxed",
          className,
        )}
        {...props}
      />
    </pre>
  );
}
