import CopyButton from "@/components/buttons/CopyButton";
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
  const codeHTML = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  });

  return (
    <pre className="not-prose relative h-full max-w-full bg-code-background">
      <CopyButton content={code} className="absolute top-3 right-3" />

      <code
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        className={cn("w-full max-w-full text-sm leading-relaxed", className)}
        {...props}
      />
    </pre>
  );
}
