"use client";

import { CopyButton, CopyButtonIcon } from "@/components/buttons/CopyButton";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { type ComponentProps, useEffect, useState } from "react";
import { codeToHtml } from "shiki";

type ComponentSourceProps = {
  lang?: string;
  className?: string;
  code: string;
} & ComponentProps<"code">;

export default function ComponentSourceClient({
  lang = "tsx",
  className,
  code,
  ...props
}: ComponentSourceProps) {
  const [codeHtml, setCodeHtml] = useState<string | null>(null);

  useEffect(() => {
    async function getCodeHtml() {
      const codeHtml = await codeToHtml(code, {
        lang,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });
      setCodeHtml(codeHtml);
    }
    getCodeHtml();
  }, [code, lang]);

  if (!codeHtml)
    return (
      <Skeleton className="grid h-20 max-w-full place-items-center rounded-xl bg-code-background">
        <Loader2Icon className="size-5 animate-spin" />
      </Skeleton>
    );

  return (
    <pre className="not-prose relative h-full max-w-full rounded-xl bg-code-background">
      <CopyButton
        contentToCopy={code}
        side="left"
        aria-label="Copy Code"
        className="absolute top-3 right-3"
      >
        <CopyButtonIcon />
      </CopyButton>

      <code
        dangerouslySetInnerHTML={{ __html: codeHtml }}
        className={cn("w-full max-w-full text-sm leading-relaxed", className)}
        {...props}
      />
    </pre>
  );
}
