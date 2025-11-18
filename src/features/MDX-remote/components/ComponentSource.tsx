import type { ComponentProps } from "react";
import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/buttons/CopyButton";
import { cn } from "@/lib/utils";
import { fileReader } from "@/utils/fileReader";

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
        className="absolute top-3 right-3"
      />

      <code
        // biome-ignore lint/security/noDangerouslySetInnerHtml: this is safe because the codeHtml variables comes from my own documents and are not user-generated
        dangerouslySetInnerHTML={{ __html: codeHtml }}
        className={cn("w-full max-w-full text-sm leading-relaxed", className)}
        {...props}
      />
    </pre>
  );
}
