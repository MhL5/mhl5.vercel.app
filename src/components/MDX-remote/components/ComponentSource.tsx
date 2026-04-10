import { CopyButton } from "@/components/buttons/CopyButton";
import { cn } from "@/lib/utils";
import { fileReader } from "@/utils/fileReader";
import type { ComponentProps } from "react";
import { codeToHtml } from "shiki";

type ComponentSourceProps = {
  lang?: string;
  className?: string;
} & ComponentProps<"code"> &
  (
    | {
        path: string;
      }
    | {
        code: string;
      }
  );

export default async function ComponentSource({
  lang = "tsx",
  className,
  ...props
}: ComponentSourceProps) {
  const code = "code" in props ? props.code : await fileReader(props.path);
  const codeHtml = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <pre className="not-prose relative max-w-full rounded-xl bg-code-background">
      <CopyButton
        contentToCopy={code}
        side="left"
        aria-label="Copy Code"
        className="absolute inset-e-3 top-3"
      />

      <code
        dangerouslySetInnerHTML={{ __html: codeHtml }}
        className={cn("w-full max-w-full text-sm leading-relaxed", className)}
        {...props}
      />
    </pre>
  );
}
